using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Threading;

namespace BufeGO_Frontend_Teszt
{
    [TestClass]
    public class LoginTests
    {
        [TestMethod]
        public void BejelentkezésTest_Tulaj()
        {
            IWebDriver driver = new ChromeDriver();
            driver.Navigate().GoToUrl("http://localhost:5173");

            var loginbutton = driver.FindElement(By.ClassName("login"));
            loginbutton.Click();

            var email_field = driver.FindElement(By.Id("email"));
            var password_field = driver.FindElement(By.Id("password"));

            email_field.SendKeys("admin1@bufego.com");
            password_field.SendKeys("asdasd");

            var sign_in_btn = driver.FindElement(By.ClassName("sign-in-button"));
            sign_in_btn.Click();
            Thread.Sleep(500);
            Assert.AreEqual("http://localhost:5173/admin", driver.Url);

            driver.Quit();
        }

        [TestMethod]
        public void BejelentkezésTest_Felhasznalo()
        {
            IWebDriver driver = new ChromeDriver();
            driver.Navigate().GoToUrl("http://localhost:5173");

            var loginbutton = driver.FindElement(By.ClassName("login"));
            loginbutton.Click();

            var email_field = driver.FindElement(By.Id("email"));
            var password_field = driver.FindElement(By.Id("password"));

            email_field.SendKeys("peter.kovacs@gmail.com");
            password_field.SendKeys("asdasd");

            var sign_in_btn = driver.FindElement(By.ClassName("sign-in-button"));
            sign_in_btn.Click();
            Thread.Sleep(500);
            Assert.AreEqual("http://localhost:5173/home", driver.Url);

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
            driver.Manage().Window.Maximize();
            var loginbutton = driver.FindElement(By.ClassName("login"));
            loginbutton.Click();

            var email_field = driver.FindElement(By.Id("email"));
            var password_field = driver.FindElement(By.Id("password"));

            email_field.SendKeys("admin1@bufego.com");
            password_field.SendKeys("asdasd");

            var sign_in_btn = driver.FindElement(By.ClassName("sign-in-button"));
            sign_in_btn.Click();
            Thread.Sleep(500);
            driver.FindElements(By.XPath("//button[contains(text(),'Kiválasztás')]"))[0].Click();
        }

        [TestCleanup]
        public void Cleanup()
        {
            driver.Quit();
        }

        [TestMethod]
        public void Navbar_Teszt()
        {
            driver.Navigate().GoToUrl("http://localhost:5173/admin");
            Thread.Sleep(500);

            var orderLink = driver.FindElement(By.Id("nav-orders"));

            orderLink.Click();
            Assert.AreEqual("http://localhost:5173/admin/orders", driver.Url);

            var statisticsLink = driver.FindElement(By.Id("nav-stats"));
            statisticsLink.Click();
            Assert.AreEqual("http://localhost:5173/admin/statistics", driver.Url);

            var productsLink = driver.FindElement(By.Id("nav-products"));
            productsLink.Click();
            Assert.AreEqual("http://localhost:5173/admin/products", driver.Url);

            var categoriesLink = driver.FindElement(By.Id("nav-categories"));
            categoriesLink.Click();
            Assert.AreEqual("http://localhost:5173/admin/categories", driver.Url);

            var reviewsLink = driver.FindElement(By.Id("nav-reviews"));
            reviewsLink.Click();
            Assert.AreEqual("http://localhost:5173/admin/reviews", driver.Url);

            driver.Quit();
        }

        [TestMethod]
        public void RendelesGeneralva()
        {
            driver.Navigate().GoToUrl("http://localhost:5173/admin/orders");
            Thread.Sleep(500);
            driver.FindElement(By.XPath("//button[contains(text(),'Részletek')]")).Click();


            var modal = driver.FindElements(By.ClassName("modal-body"));

            var adatok = modal[0].FindElements(By.XPath("./p"));
            var termeklista = modal[0].FindElement(By.XPath("./ul"));

            var orderId = adatok[0].Text;
            var email = adatok[1].Text;
            var status = adatok[2].Text;
            var orderTime = adatok[3].Text;
            var total = adatok[4].Text;

            int orderIdNumber = int.Parse(orderId.Split(':')[1].Trim());
            string emailAddress = email.Split(':')[1].Trim();
            int statusNumber = int.Parse(status.Split(':')[1].Trim());
            DateTime orderDate = DateTime.Parse(orderTime.Split(':')[1].Trim() + ":" + orderTime.Split(':')[2].Trim() + ":" + orderTime.Split(':')[3].Trim());
            int totalAmount = int.Parse(total.Replace("Összesen:", "").Replace("Ft", "").Trim());

            Assert.IsTrue(orderIdNumber > 0, "Order ID nem 0");
            Assert.IsFalse(string.IsNullOrEmpty(emailAddress), "Email cím nem null vagy üres");
            Assert.IsTrue(statusNumber >= 0, "Státusz egy nem negatív szám");
            Assert.IsTrue(totalAmount > 0, "A teljes összeg nagyobb mint 0");
            Assert.IsTrue(orderDate > DateTime.MinValue, "Valid a rendelés dátuma");

            driver.Quit();
        }

        [TestMethod]
        public void ProductGeneralva()
        {
            driver.Navigate().GoToUrl("http://localhost:5173/admin/products");
            Thread.Sleep(500);

            var container = driver.FindElement(By.ClassName("products-grid"));
            var cards = container.FindElements(By.XPath("./div"));

            Assert.IsTrue(cards.Count != 0);

            driver.Quit();
        }

        [TestMethod]
        public void ProductTorles()
        {
            driver.Navigate().GoToUrl("http://localhost:5173/admin/products");
            Thread.Sleep(500);

            var container = driver.FindElement(By.ClassName("products-grid"));
            var cards = container.FindElements(By.XPath("./div"));
            cards[0].FindElement(By.XPath("./div/div/button[contains(@class,'btn-outline-danger')]")).Click();

            Thread.Sleep(500);
            var modal_body = driver.FindElement(By.ClassName("modal-body"));
            modal_body.FindElement(By.XPath("./button[contains(@class,'accept-button')]")).Click();
            Thread.Sleep(500);

            Assert.IsTrue(driver.FindElement(By.ClassName("alert")).Text == "Sikeres törlés");

            driver.Quit();
        }

        [TestMethod]
        public void UjKategoria()
        {
            driver.Navigate().GoToUrl("http://localhost:5173/admin/categories");
            Thread.Sleep(2000);

            var grid = driver.FindElement(By.ClassName("categories-grid"));
            int originalcount = grid.FindElements(By.XPath("./div")).Count();

            var addbutton = driver.FindElement(By.XPath("//button[contains(text(),'Új kategória létrehozása')]"));
            addbutton.Click();

            var helyinput = driver.FindElement(By.Id("HelyInput"));
            helyinput.SendKeys("1");
            driver.FindElement(By.XPath("//button[contains(text(),'Mentés')]")).Click();
            Thread.Sleep(500);
            int newcount = grid.FindElements(By.XPath("./div")).Count();

            Assert.IsTrue(newcount > originalcount);

            driver.Quit();
        }

        [TestMethod]
        public void ErtekelesTeszt()
        {
            driver.Navigate().GoToUrl("http://localhost:5173/admin/reviews");
            Thread.Sleep(500);

            var container = driver.FindElement(By.ClassName("reviews-grid"));
            var cards = container.FindElements(By.XPath("./div"));

            Assert.IsTrue(cards.Count != 0);

            driver.Quit();
        }
    }

    [TestClass]
    public class UserTests
    {
        private IWebDriver driver;

        [TestInitialize]
        public void UserLogin()
        {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl("http://localhost:5173");
            driver.Manage().Window.Maximize();

            var loginbutton = driver.FindElement(By.ClassName("login"));
            loginbutton.Click();

            // Print the first result title
            var email_field = driver.FindElement(By.Id("email"));
            var password_field = driver.FindElement(By.Id("password"));

            email_field.SendKeys("eszter.toth@gmail.com");
            password_field.SendKeys("asdasd");

            var sign_in_btn = driver.FindElement(By.ClassName("sign-in-button"));
            sign_in_btn.Click();
            Thread.Sleep(500);
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

            Thread.Sleep(500);
            var container = driver.FindElement(By.ClassName("row"));
            var cards = container.FindElements(By.XPath("./div"));

            Assert.IsTrue(cards.Count > 0, "A büfé kártyák megjelennek");

            driver.Quit();
        }

        [TestMethod]
        public void Bufe_Link()
        {
            driver.Navigate().GoToUrl("http://localhost:5173/home");

            Thread.Sleep(500);
            var container = driver.FindElement(By.ClassName("row"));
            var cards = container.FindElements(By.XPath("./div"));
            var button = cards[0].FindElement(By.XPath("./div/div/button"));
            button.Click();

            Assert.IsTrue(!driver.Url.Equals("http://localhost:5173/home"), "A büfé kártyák gombjai átdobnak");

            driver.Quit();
        }

        [TestMethod]
        public void Kosarba_felvetel()
        {
            driver.Navigate().GoToUrl("http://localhost:5173/home/bufe/1");

            Thread.Sleep(1000);
            var container = driver.FindElement(By.Id("categories_container"));
            var categorydiv = container.FindElements(By.XPath("./div"))[0];
            categorydiv.FindElement(By.XPath("./div")).Click();
            Thread.Sleep(500);
            var modal = driver.FindElement(By.ClassName("modal-body"));
            var input = modal.FindElement(By.XPath("./form/input"));
            input.SendKeys("1");
            var modalfooter = driver.FindElement(By.ClassName("modal-footer"));
            modalfooter.FindElement(By.XPath("./button[contains(text(),'Kosárba')]")).Click();
            Thread.Sleep(500);

            driver.FindElement(By.Id("cart_nav")).Click();

            Thread.Sleep(500);
            var cart_modal = driver.FindElement(By.ClassName("modal-body"));
            var products = cart_modal.FindElements(By.XPath("./div"));

            Assert.IsTrue(products.Count > 0, "Felveszi a termékeket a kosárba");

            driver.Quit();
        }

        [TestMethod]
        public void Rendeles_teszt_full()
        {
            driver.Navigate().GoToUrl("http://localhost:5173/home/bufe/1");

            Thread.Sleep(1000);
            var container = driver.FindElement(By.Id("categories_container"));
            var categorydiv = container.FindElements(By.XPath("./div"))[0];
            categorydiv.FindElement(By.XPath("./div")).Click();
            Thread.Sleep(500);
            var modal = driver.FindElement(By.ClassName("modal-body"));
            var input = modal.FindElement(By.XPath("./form/input"));
            input.SendKeys("1");
            var modalfooter = driver.FindElement(By.ClassName("modal-footer"));
            modalfooter.FindElement(By.XPath("./button[contains(text(),'Kosárba')]")).Click();
            Thread.Sleep(500);

            driver.FindElement(By.Id("cart_nav")).Click();

            Thread.Sleep(500);
            var modal_footer = driver.FindElement(By.ClassName("modal-footer"));
            var button = modal_footer.FindElement(By.XPath("./button"));
            button.Click();

            Thread.Sleep(500);
            IAlert alert = driver.SwitchTo().Alert();

            Assert.IsTrue(alert.Text == "Rendelését leadtuk!", "A teljes rendelési folyamat jól megy.");

            driver.Quit();
        }
    }
}
