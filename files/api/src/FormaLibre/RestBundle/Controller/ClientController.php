<?php

namespace FormaLibre\RestBundle\Controller;

use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\View\View;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ClientController extends FOSRestController
{
    /**
     * List all clients.
     *
     * @ApiDoc(
     *   resource = true,
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   }
     * )
     *
     * @Annotations\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing clients.")
     * @Annotations\QueryParam(name="limit", requirements="\d+", default="50", description="How many clients to return.")
     *
     * @Annotations\View()
     *
     * @param ParamFetcherInterface $paramFetcher param fetcher service
     *
     * @return array
     */
    public function getClientsAction(ParamFetcherInterface $paramFetcher)
    {
        $offset = $paramFetcher->get('offset');
        $start = null == $offset ? 0 : $offset + 1;
        $limit = $paramFetcher->get('limit');
        $client = $this->get('guzzle.client.api');
        $response = $client->get('clients?limit='.$limit.'&offset='.$offset);

        return json_decode($response->getBody(), true);
    }

    /**
     * Get a single server.
     *
     * @ApiDoc(
     *   output = "ClientBundle\Entity\Client",
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
    public function getClientAction(Request $request, $id)
    {
        $client = $this->get('guzzle.client.api');
        $response = $client->get('clients/'.$id);

        return json_decode($response->getBody(), true);
    }

    /**
     * Creates a new server from the submitted data.
     *
     * @ApiDoc(
     *   resource = true,
     *   input = "ClientBundle\Form\ClientType",
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
    public function postClientsAction(Request $request)
    {
        $clients = json_decode($request->getContent());

        $client = $this->get('guzzle.client.api');
        $responseBackend = $client->request(
        'POST',
        'clients',
        [
          'json' => $clients,
        ]

      );

        $clients = json_decode($responseBackend->getBody());

        $response = new Response($responseBackend->getBody());
        $response->setStatusCode($responseBackend->getStatusCode());

        if ($responseBackend->getHeader('Location')) {
            $location = $this->generateUrl('get_clients', array(), UrlGeneratorInterface::ABSOLUTE_URL).'/'.$clients->id;
            $response->headers->set('Location', $location);
        }

        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * Update existing server from the submitted data or create a new server at a specific location.
     *
     * @ApiDoc(
     *   resource = true,
     *   input = "ClientBundle\Form\ClientType",
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
    public function putClientsAction(Request $request, $id)
    {
        $clients = json_decode($request->getContent());
        $client = $this->get('guzzle.client.api');
        $response = $client->request(
        'PUT',
        'clients/'.$id,
        [
          'json' => $clients,
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
     */
    public function deleteClientsAction(Request $request, $id)
    {
        $client = $this->get('guzzle.client.api');
        $response = $client->request('DELETE', 'clients/'.$id, ['json' => []]);

        return json_decode($response->getBody(), true);
    }
}
