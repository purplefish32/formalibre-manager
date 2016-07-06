<?php
//loading all classes
spl_autoload_register(function ($classname) {
    require (__dir__ . "/classes/" . $classname . ".php");
});

// Routes

$app->get('/', function ($request, $response) {
    return $this->view->render($response, 'index.html.twig');
})->setName('dashboard');

$app->get('/servers', function ($request, $response) {
    return $this->view->render($response, 'servers.html.twig');
})->setName('servers');

$app->get('/platforms', function ($request, $response) {
    return $this->view->render($response, 'platforms.html.twig');
})->setName('platforms');

$app->get('/platforms/new', function ($request, $response) {
    return $this->view->render($response, 'platformsNew.html.twig');
})->setName('platformsNew');

$app->get('/people', function ($request, $response) {
    return $this->view->render($response, 'people.html.twig');
})->setName('people');

$app->get('/entities', function ($request, $response) {
    return $this->view->render($response, 'entities.html.twig');
})->setName('entities');

// API group
$app->group('/api', function () use ($app) {

    // V1 group
    $app->group('/v1', function () use ($app, $db) {

        // Get book with ID
        $app->get('/servers', function ($request, $response) {
            $mapper = new ServerMapper($this->db);
            $servers = $mapper->getServers();
            foreach ($servers as $server) {
              # code...
            }
            return $response->withJson(
                ['id' => 5]
            );
        });

        /*

        // Get book with ID
        $app->get('/books/:id', function ($id) {

        });

        // Update book with ID
        $app->put('/books/:id', function ($id) {

        });

        // Delete book with ID
        $app->delete('/books/:id', function ($id) {

        });

        */

    });

});
