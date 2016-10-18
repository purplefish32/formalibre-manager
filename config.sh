#!/bin/bash



pholder -c config/config_html.json files/frontend/webroot/templates/servers.component.html
pholder -c config/config_html.json files/frontend/webroot/templates/platforms.component.html
pholder -c config/config_html.json files/frontend/webroot/templates/server-edit.component.html
pholder -c config/config_html.json files/frontend/webroot/templates/platform-edit.component.html
pholder -c config/config_html.json files/frontend/app/servers/server-detail.component.ts
pholder -c config/config_html.json files/frontend/app/platforms/platform-detail.component.ts

pholder -c config/config_ts.json files/frontend/app/servers/server.ts
pholder -c config/config_ts.json files/frontend/app/platforms/platform.ts
pholder -c config/config_ts.json files/frontend/app/events/event.ts


pholder -c config/config_php.json files/api/src/FormaLibre/RestBundle/Controller/PlatformController.php
