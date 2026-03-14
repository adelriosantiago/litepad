const { test, expect } = require("@playwright/test")

test.describe("Litepad app", () => {
  test("loads the collaborative editor shell", async ({ page }) => {
    const response = await page.goto("/")

    expect(response).not.toBeNull()
    expect(response.status()).toBe(200)
    await expect(page).toHaveTitle("Litepad")
    await expect(page.locator(".CodeMirror")).toBeVisible()
    await expect(
      page.locator("script[src='/socket.io/socket.io.js']")
    ).toHaveCount(1)
  })

  test("syncs content between two browser clients", async ({ browser }) => {
    const contextOne = await browser.newContext()
    const contextTwo = await browser.newContext()
    const pageOne = await contextOne.newPage()
    const pageTwo = await contextTwo.newPage()

    await pageOne.goto("/")
    await pageTwo.goto("/")

    await expect(pageOne.locator(".CodeMirror")).toBeVisible()
    await expect(pageTwo.locator(".CodeMirror")).toBeVisible()

    const sharedSuffix = ` playwright-sync-${Date.now()}`

    // Type through CodeMirror's hidden textarea so emitted changes match user input events.
    await pageOne.locator(".CodeMirror textarea").first().click({ force: true })
    await pageOne.keyboard.type(sharedSuffix)

    await expect(pageTwo.locator(".CodeMirror-code")).toContainText(
      sharedSuffix
    )

    await contextOne.close()
    await contextTwo.close()
  })
})
