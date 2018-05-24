import { browser, by, element } from 'protractor';

function awaitUrl(newUrl) {
	return function () {
		return browser.getCurrentUrl().then(function (url) {
			return newUrl.test(url);
		});
	}
}

describe('Tests for messages', () => {

	it('1.0: Should login to begin tests', () => {
		browser.get('/home/login');
		expect(element(by.css("h1")).getText()).toEqual("LOGIN");

		element.all(by.name("username")).sendKeys("Lady Triumph")
		element.all(by.name("password")).sendKeys("secret")
		expect(element(by.id('loginForm')).getAttribute('class')).toContain('ng-valid');

		element.all(by.id("btnLogin")).click();

		expect(element(by.css("h1")).getText()).toEqual("FIND A BIKER");
	})


	it('2.0: Should go to conversation from overview', () => {
		// Click the first chat button on the page
		element.all(by.css(".chat-button")).get(0).click();

		// We need to disable this because of the web sockets
		browser.waitForAngularEnabled(false)

		// Check that we are in an actual conversation containing text imput
		expect(element(by.css('.conversation')).isElementPresent(by.id('write-message'))).toBe(true);
	})


	it('3.0: Should add a new message', function () {
		// Get the message count before adding
		let messageCount = element.all(by.css('.message')).count().then(function (count) {
			return count + 1;
		})

		// Add message
		element.all(by.css("textarea")).sendKeys("E2e test message");
		element.all(by.id("btnSend")).click();

		// Wait for async functions to run because we swithced it off
		browser.sleep(1000)

		// Check that the new message count is correct
		expect(element.all(by.css('.message')).count()).toBe(messageCount)
	})


	it('4.0: Should go to conversation from user profile', () => {
		element.all(by.id("btnPortal")).click().then(function () {
			expect(element(by.css("h1")).getText()).toEqual("FIND A BIKER");
		})

		element.all(by.css(".biker-image")).last().click().then(function () {
			expect(element(by.css('.profile-container')).isElementPresent(by.css('.profile-details'))).toBe(true);
		})

		element.all(by.id("btnChat")).click().then(function () {
			// Check that we are in an actual conversation containing text imput
			expect(element(by.css('.conversation')).isElementPresent(by.id('write-message'))).toBe(true);
		})
	})


});
