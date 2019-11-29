module.exports = {
    'Test template'(browser) {
        browser
            .url('http://localhost:8080/index.html')
            .waitForElementVisible('body')
            .setValue('input[name="username"]', 'Eric')
            .click('button[name="test-button"]')
            .pause(1000)
            .assert.containsText('#hello', 'Hello ERIC')
            .end()
    }
}
