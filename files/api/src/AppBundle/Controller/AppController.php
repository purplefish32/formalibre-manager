<?php

namespace AppBundle\Controller;

use ServerBundle\Form\ServerType;
use ServerBundle\Manager\ServerManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\View\View;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use GuzzleHttp\Exception\RequestException;

class AppController extends FOSRestController
{



  /**
   * List all platforms.
   *
   * @ApiDoc(
   *   resource = true,
   *   statusCodes = {
   *     200 = "Returned when successful"
   *   }
   * )
   *
   * @Annotations\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing platforms.")
   * @Annotations\QueryParam(name="limit", requirements="\d+", default="50", description="How many platforms to return.")
   *
   * @Annotations\View()
   *
   * @param ParamFetcherInterface $paramFetcher param fetcher service
   *
   * @return array
   */
  public function getPlatformsAction(ParamFetcherInterface $paramFetcher)
  {
      $offset = $paramFetcher->get('offset');
      $start = null == $offset ? 0 : $offset + 1;
      $limit = $paramFetcher->get('limit');
      $client = $this->get('guzzle.client.api');
      $response = $client->get('/platforms?limit=' . $limit . '&offset=' . $offset);

      return json_decode($response->getBody(), true);
  }


  /**
   * Creates a new platform from the submitted data.
   */
  public function postPlatformsAction(Request $request)
  {
      $platform = json_decode($request->getContent());
      $client = $this->get('guzzle.client.api');
      try {

          $response = $client->request(
              'POST',
              '/platforms',
              [
                  'json' => $platform
              ]

          );

      } catch (RequestException $e) {
          if ($e->getResponse()->getStatusCode() == Response::HTTP_BAD_REQUEST) {
              $data = json_decode($e->getResponse()->getBody(), true);
              $view = $this->view($data, Response::HTTP_BAD_REQUEST);

              return $this->handleView($view);
          }
      }

      return json_decode($response->getBody(), true);

  }


  /**
   * Removes a platform.
   *
   * @ApiDoc(
   *   resource = true,
   *   statusCodes={
   *     204="Returned when successful"
   *   }
   * )
   *
   * @param Request $request the request object
   * @param int     $id      the platform id
   *
   */
  public function deletePlatformsAction(Request $request, $id)
  {
    $client = $this->get('guzzle.client.api');
    try {
        $response = $client->request('DELETE', '/platforms/' . $id);
    } catch (RequestException $e) {
        if ($e->getResponse()->getStatusCode() == Response::HTTP_NOT_FOUND) {
            throw $this->createNotFoundException("Server does not exist.");
        }
    }
    return json_decode($response->getBody(), true);
  }
















    /**
     * List all servers.
     *
     * @ApiDoc(
     *   resource = true,
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   }
     * )
     *
     * @Annotations\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing servers.")
     * @Annotations\QueryParam(name="limit", requirements="\d+", default="50", description="How many servers to return.")
     *
     * @Annotations\View()
     *
     * @param ParamFetcherInterface $paramFetcher param fetcher service
     *
     * @return array
     */
    public function getServersAction(ParamFetcherInterface $paramFetcher)
    {
        $offset = $paramFetcher->get('offset');
        $start = null == $offset ? 0 : $offset + 1;
        $limit = $paramFetcher->get('limit');
        $client = $this->get('guzzle.client.api');
        $response = $client->get('/servers?limit=' . $limit . '&offset=' . $offset);

        return json_decode($response->getBody(), true);
    }

    /**
     * Get a single server.
     *
     * @ApiDoc(
     *   output = "ServerBundle\Entity\Server",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the note is not found"
     *   }
     * )
     *
     * @Annotations\View()
     *
     * @param Request $request the request object
     * @param int     $id      the server id
     *
     * @return array
     *
     * @throws NotFoundHttpException when note not exist
     */
    public function getServerAction(Request $request, $id)
    {
      $client = $this->get('guzzle.client.api');
      $response = $client->get('/servers/' . $id);
      return json_decode($response->getBody(), true);
    }

    /**
     * Creates a new server from the submitted data.
     *
     * @ApiDoc(
     *   resource = true,
     *   input = "ServerBundle\Form\ServerType",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     400 = "Returned when the form has errors"
     *   }
     * )
     *
     * @param Request $request the request object
     *
     * @return FormTypeInterface[]|View
     */
    public function postServersAction(Request $request)
    {
      $data = json_decode($request->getContent());
      $server = $data->server;
      $client = $this->get('guzzle.client.api');
      $response = $client->request(
        'POST',
        '/servers',
        [
          'json' => [
            "server" => [
              "ip" => $server->ip,
              "name" => $server->name,
              "description" => $server->description,
              "provider" => $server->provider,
              "type" => $server->type,
            ]
          ]
        ]

      );

      return json_decode($response->getBody(), true);
    }

    /**
     * Update existing server from the submitted data or create a new server at a specific location.
     *
     * @ApiDoc(
     *   resource = true,
     *   input = "ServerBundle\Form\ServerType",
     *   statusCodes = {
     *     201 = "Returned when a new resource is created",
     *     204 = "Returned when successful",
     *     400 = "Returned when the form has errors"
     *   }
     * )
     *
     * @param Request $request the request object
     * @param int     $id      the note id
     *
     * @return FormTypeInterface|RouteRedirectView
     *
     * @throws NotFoundHttpException when server not exist
     */
    public function putServersAction(Request $request, $id)
    {
      $data = json_decode($request->getContent());
      $server = $data->server;
      $client = $this->get('guzzle.client.api');
      $response = $client->request(
        'PUT',
        '/servers/' . $id,
        [
          'json' => [
            'server' => [
              'ip' => $server->ip,
              'name' => $server->name,
              'description' => $server->description,
              'provider' => $server->provider,
              'type' => $server->type,
            ]
          ]
        ]

      );

      return json_decode($response->getBody(), true);
    }

    /**
     * Removes a server.
     *
     * @ApiDoc(
     *   resource = true,
     *   statusCodes={
     *     204="Returned when successful"
     *   }
     * )
     *
     * @param Request $request the request object
     * @param int     $id      the server id
     *
     */
    public function deleteServersAction(Request $request, $id)
    {
        $client = $this->get('guzzle.client.api');
        $response = $client->request('DELETE','/servers/' . $id);
        return json_decode($response->getBody(), true);
    }
}
