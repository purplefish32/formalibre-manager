<?php
//loading all classes
spl_autoload_register(function ($classname) {
    require (__dir__ . "/classes/" . $classname . ".php");
});

// Routes
$app->get('/', function ($request, $response) {
    return $this->view->render($response, 'index.html.twig');
})->setName('dashboard');

$app->get('/servers', function ($request, $response) use ($app) {
    $clientResponse = $this->client->get('http://backend/app_dev.php/servers');
    $servers = json_decode($clientResponse->getBody());
    return $this->view->render($response, 'servers.html.twig', [
        'servers' => $servers
    ]);
})->setName('servers');

$app->get('/platforms', function ($request, $response) {
  $clientResponse = $this->client->get('http://backend/app_dev.php/platforms');
  $platforms = json_decode($clientResponse->getBody());
  return $this->view->render($response, 'platforms.html.twig', [
      'platforms' => $platforms
  ]);
})->setName('platforms');

$app->get('/platforms/new', function ($request, $response) {
    $clientResponse = $this->client->get('http://backend/app_dev.php/platforms');
    return $this->view->render($response, 'platformsNew.html.twig');
})->setName('platformsNew');

$app->post('/platforms/new', function ($request, $response) {
    $clientResponse = $this->client->post('http://backend/app_dev.php/platforms');
    $platforms = json_decode($clientResponse->getBody());
    return $this->view->render($response, 'platforms.html.twig', [
        'platforms' => $platforms
    ]);
})->setName('platforms_new');

$app->get('/people', function ($request, $response) {
    return $this->view->render($response, 'people.html.twig');
})->setName('people');

$app->get('/entities', function ($request, $response) {
    return $this->view->render($response, 'entities.html.twig');
})->setName('entities');
