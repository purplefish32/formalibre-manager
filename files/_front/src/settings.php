<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
        ],
        // DB settings
        'db' => [
            'host' => 'db',
            'dbname' => 'db',
            'user' => 'user',
            'password' => 'pass',
        ],
    ],
];
