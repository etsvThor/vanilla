# old
Manual edits done to disable accepting shit on registration:

- Commented lines 1493 and 1497 of /var/www/vanillaforum/applications/dashboard/controllers/class.entrycontroller.php (registerApproval function)
- Added ' style="display: none !important;"' to lines 48 and 59 of /var/www/vanillaforum/applications/dashboard/views/entry/registerapproval.php
- Changed 'Email/Username' to 'E-mailadres' to stop confusion in file /var/www/vanillaforum/locales/vf_nl/site_core.php line 490

# after 2021-10-10:

- commented 1300 and 1304 and 1462 and 1504 of /var/www/vanillaforum/applications/dashboard/controllers/class.entrycontroller.php (registerApproval function)
- Added ' style="display: none !important;"' to lines 48 and 59 of /var/www/vanillaforum/applications/dashboard/views/entry/registerapproval.php

# 2021-11-06
Changed `class.entrycontroller.php` to support multiple emails from oauth. 
