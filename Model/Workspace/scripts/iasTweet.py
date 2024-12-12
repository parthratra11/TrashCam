from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

siteLink = 'https://x.com/home'


options = webdriver.ChromeOptions()
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--remote-debugging-port=9222")
options.add_argument("--disable-extensions")
options.add_argument("--log-level=3") 
options.add_experimental_option("excludeSwitches", ["enable-logging"]) 


driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.get(siteLink)

# time.sleep(2)

wait = WebDriverWait(driver, 10)

closeButton = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[data-testid='xMigrationBottomBar']")))
closeButton.click()

signInButton = wait.until(EC.element_to_be_clickable((By.XPATH, "//span[text()='Sign in']")))
signInButton.click()

# time.sleep(5)

usernameInput = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[autocomplete='username']")))
usernameInput.send_keys('TrashCam2024')

nextButton = driver.find_element(By.XPATH, "//span[text()='Next']")
nextButton.click()

passwordInput = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[autocomplete='current-password']")))
passwordInput.send_keys('sih@2024')

loginButton = wait.until(EC.element_to_be_clickable((By.XPATH, "//span[text()='Log in']")))
loginButton.click()

# time.sleep(4)

closeButton = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[data-testid='xMigrationBottomBar']")))
closeButton.click()

tweetArea = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "div[data-testid='tweetTextarea_0']")))
tweetArea.click()   
tweetArea.send_keys(f'''A trash pile report has been pending for the last 7 days. Kindly take the required action. Report details below:  
- 2024-12-11T23:45:14.887819
- malka ganj
- [77.171984469442194, 28.7693611987503]
- https://tinyurl.com/mpah9sw6 
- Zone: central  
@AuthorityTag ''')

postButton = wait.until(EC.element_to_be_clickable((By.XPATH, "//span[text()='Post']")))
postButton.click()

# time.sleep(4)

driver.quit()