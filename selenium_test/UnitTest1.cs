using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.UI;
using System;
using System.Threading;

namespace Selenium_Tesztek
{
    [TestClass]
    public class LoginTests
    {
        [TestMethod]
        public void BejelentkezésTest_Owner()
        {
            IWebDriver driver = new ChromeDriver();
            driver.Navigate().GoToUrl("http://localhost:5173");

            var loginbutton = driver.FindElement(By.ClassName("login"));
            loginbutton.Click();

            var email_field = driver.FindElement(By.Id("email"));
            var password_field = driver.FindElement(By.Id("password"));

            email_field.SendKeys("alisha.hintz@example.com");
            password_field.SendKeys("cgrk");

            var sign_in_btn = driver.FindElement(By.ClassName("sign-in-button"));
            sign_in_btn.Click();
            //Kell az url-t csekkolni, hogy jó owner vagy user oldalra megy

            driver.Quit();
        }

        [TestMethod]
        public void BejelentkezésTest_User()
        {
            IWebDriver driver = new ChromeDriver();
            driver.Navigate().GoToUrl("http://localhost:5173");

            var loginbutton = driver.FindElement(By.ClassName("login"));
            loginbutton.Click();

            var email_field = driver.FindElement(By.Id("email"));
            var password_field = driver.FindElement(By.Id("password"));

            email_field.SendKeys("fisher.laurel@example.net");
            password_field.SendKeys("kntv");

            var sign_in_btn = driver.FindElement(By.ClassName("sign-in-button"));
            sign_in_btn.Click();
            //Kell az url-t csekkolni, hogy jó owner vagy user oldalra megy

            driver.Quit();
        }
    }

    [TestClass]
    public class AdminTests
    {
        private IWebDriver driver;

        [TestInitialize]
        public void Adminlogin()
        {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl("http://localhost:5173");
            driver.Manage().Window.Size = new System.Drawing.Size(1200, 800);

            var loginbutton = driver.FindElement(By.ClassName("login"));
            loginbutton.Click();

            var email_field = driver.FindElement(By.Id("email"));
            var password_field = driver.FindElement(By.Id("password"));

            email_field.SendKeys("alisha.hintz@example.com");
            password_field.SendKeys("cgrk");

            var sign_in_btn = driver.FindElement(By.ClassName("sign-in-button"));
            sign_in_btn.Click();
            //Kell az url-t csekkolni, hogy jó owner vagy user oldalra megy

        }

        [TestCleanup]
        public void Cleanup()
        {
            driver.Quit();
        }

        [TestMethod]
        public void Navbar_Test()
        {
            driver.Navigate().GoToUrl("http://localhost:5173/admin");

            Thread.Sleep(1000);
            var orderLink = driver.FindElement(By.Id("nav-orders"));

            orderLink.Click();
            Assert.AreEqual(driver.Url, "http://localhost:5173/admin/orders");

            driver.Navigate().Back();
            var statisticsLink = driver.FindElement(By.Id("nav-stats"));
            statisticsLink.Click();
            Assert.AreEqual(driver.Url, "http://localhost:5173/admin/statistics");

            driver.Navigate().Back();
            var productsLink = driver.FindElement(By.Id("nav-products"));
            productsLink.Click();
            Assert.AreEqual(driver.Url, "http://localhost:5173/admin/products");

            driver.Navigate().Back();
            var categoriesLink = driver.FindElement(By.Id("nav-categories"));
            categoriesLink.Click();
            Assert.AreEqual(driver.Url, "http://localhost:5173/admin/categories");

            driver.Navigate().Back();
            var reviewsLink = driver.FindElement(By.Id("nav-reviews"));
            reviewsLink.Click();
            Assert.AreEqual(driver.Url, "http://localhost:5173/admin/reviews");

            driver.Quit();
        }

        [TestMethod]
        public void RendelesTeszt()
        {
            //TODO: Kell majd for ciklus át az egészen + valamiért a bekérés nem jó
            driver.FindElement(By.XPath("//div[class=order-actions]"));
            driver.FindElement(By.LinkText("Részletek")).Click();

            var modal = driver.FindElement(By.ClassName("modal-body"));

            var orderId = modal.FindElement(By.XPath(".//p[strong[contains(text(),'Rendelés azonosító')]]")).Text;
            var email = modal.FindElement(By.XPath(".//p[strong[contains(text(),'Email')]]")).Text;
            var status = modal.FindElement(By.XPath(".//p[strong[contains(text(),'Státusz')]]")).Text;
            var orderTime = modal.FindElement(By.XPath(".//p[strong[contains(text(),'Rendelés leadásának ideje')]]")).Text;
            var total = modal.FindElement(By.XPath(".//p[strong[contains(text(),'Összesen')]]")).Text;

            int orderIdNumber = int.Parse(orderId.Split(':')[1].Trim());
            string emailAddress = email.Split(':')[1].Trim();
            int statusNumber = int.Parse(status.Split(':')[1].Trim());
            DateTime orderDate = DateTime.Parse(orderTime.Split(':')[1].Trim() + orderTime.Split(':')[2].Trim() + orderTime.Split(':')[3].Trim());
            int totalAmount = int.Parse(total.Replace("Összesen:", "").Replace("Ft", "").Trim());

            Assert.IsTrue(orderIdNumber > 0, "Order ID nem 0");
            Assert.IsFalse(string.IsNullOrEmpty(emailAddress), "Email cím nem null vagy üres");
            Assert.IsTrue(statusNumber >= 0, "Státusz egy nem negatív szám");
            Assert.IsTrue(totalAmount > 0, "A teljes összeg nagyobb mint 0");
            Assert.IsTrue(orderDate > DateTime.MinValue, "Valid a rendelés dátuma");
        }

        /*
        [TestMethod]
        public void Navbar_Test()
        {
            driver.Navigate().GoToUrl("http://localhost:5173/admin");
            driver.Manage().Window.Size = new System.Drawing.Size(1200, 800);

            var orderLink = driver.FindElement(By.Id("nav-orders"));

            orderLink.Click();
            Assert.AreEqual(driver.Url, "http://localhost:5173/admin/orders");

            driver.Navigate().Back();
            var statisticsLink = driver.FindElement(By.Id("nav-stats"));
            statisticsLink.Click();
            Assert.AreEqual(driver.Url, "http://localhost:5173/admin/statistics");

            driver.Navigate().Back();
            var productsLink = driver.FindElement(By.Id("nav-products"));
            productsLink.Click();
            Assert.AreEqual(driver.Url, "http://localhost:5173/admin/products");

            driver.Navigate().Back();
            var categoriesLink = driver.FindElement(By.Id("nav-categories"));
            categoriesLink.Click();
            Assert.AreEqual(driver.Url, "http://localhost:5173/admin/categories");

            driver.Navigate().Back();
            var reviewsLink = driver.FindElement(By.Id("nav-reviews"));
            reviewsLink.Click();
            Assert.AreEqual(driver.Url, "http://localhost:5173/admin/reviews");

            driver.Quit();
        }
        */
    }

    [TestClass]
    public class UserTests
    {
        private IWebDriver driver;

        [TestInitialize]
        public void Adminlogin()
        {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl("http://localhost:5173");

            var loginbutton = driver.FindElement(By.ClassName("login"));
            loginbutton.Click();

            // Print the first result title
            var email_field = driver.FindElement(By.Id("email"));
            var password_field = driver.FindElement(By.Id("password"));

            email_field.SendKeys("fisher.laurel@example.net");
            password_field.SendKeys("kntv");

            var sign_in_btn = driver.FindElement(By.ClassName("sign-in-button"));
            sign_in_btn.Click();
        }

        [TestCleanup]
        public void Cleanup()
        {
            driver.Quit();
        }

        [TestMethod]
        public void Bufek_Lathatok()
        {
            driver.Navigate().GoToUrl("http://localhost:5173/home");

            Thread.Sleep(2000);
            var container = driver.FindElement(By.ClassName("row"));
            var cards = container.FindElements(By.XPath("./div"));

            Assert.IsTrue(cards.Count > 0, "A büfé kártyák megjelennek");

            driver.Quit();
        }

        [TestMethod]
        public void Bufe_Link()
        {
            driver.Navigate().GoToUrl("http://localhost:5173/home");

            Thread.Sleep(2000);
            var container = driver.FindElement(By.ClassName("row"));
            var cards = container.FindElements(By.XPath("./div"));
            var button = cards[0].FindElement(By.XPath("./div/div/button"));
            button.Click();

            Assert.IsTrue(!driver.Url.Equals("http://localhost:5173/home"), "A büfé kártyák gombjai átdobnak");

            driver.Quit();
        }
    }
}
