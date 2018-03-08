import { browser, by, element } from 'protractor';

function awaitUrl(newUrl) {
	return function () {
        return browser.getCurrentUrl().then(function(url) {
            return newUrl.test(url);
        });
    }
}

describe('Tests for babies', () => {

	it('1.0: Should create a new baby with valid input', () => {
		browser.get('/home/register-baby');
		expect(element(by.css("h1")).getText()).toEqual("Register baby");

		element.all(by.name("username")).sendKeys("AlfredAlfredsen")
		element.all(by.name("area")).sendKeys("Greater Copenhagen")
		element.all(by.name("password")).sendKeys("treR2345")
		element.all(by.name("repeat")).sendKeys("treR2345")
		element.all(by.name("firstname")).sendKeys("Alfred")
		element.all(by.name("lastname")).sendKeys("Alfredsen")
		element.all(by.name("birthdate")).sendKeys("3/1/18")
		element(by.name("gender")).element(by.cssContainingText('mat-option','Female')).click();
		expect(element(by.id('registerBabyForm')).getAttribute('class')).toContain('ng-valid');
		element.all(by.id("submitNewBaby")).click();
		browser.wait(awaitUrl(/portal/), 1000);
	})

	it('1.1: Should not create a new baby with invalid input', () => {
		browser.get('/home/register-baby');
		expect(element(by.css("h1")).getText()).toEqual("Register baby");
		expect(element(by.id('registerBabyForm')).getAttribute('class')).toContain('ng-invalid');
		element.all(by.css("button")).get(0).click();

		// Do some other test here
	})

	it('2.0: Should update an existing baby with valid data', () => {

	})

	it('2.1: Should not update an existing baby with invalid data', () => {

	})

	it('3.0: Should delete a baby', () => {
		browser.get('/portal/users');
		element.all(by.css(".btnEditBaby")).get(0).click();
		browser.wait(awaitUrl(/baby/), 1000);
		element.all(by.id(".btnDeleteBaby")).click();
	})


});
