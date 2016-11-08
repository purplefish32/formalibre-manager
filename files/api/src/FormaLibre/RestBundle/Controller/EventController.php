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

class EventController extends FOSRestController
{
    /**
     * List all events.
     *
     * @ApiDoc(
     *   resource = true,
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   }
     * )
     *
     * @Annotations\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing events.")
     * @Annotations\QueryParam(name="limit", requirements="\d+", default="50", description="How many events to return.")
     *
     * @Annotations\View()
     *
     * @param ParamFetcherInterface $paramFetcher param fetcher service
     *
     * @return array
     */
    public function getEventsAction(ParamFetcherInterface $paramFetcher)
    {
        $offset = $paramFetcher->get('offset');
        $start = null == $offset ? 0 : $offset + 1;
        $limit = $paramFetcher->get('limit');
        $client = $this->get('guzzle.client.node');
        $response = $client->get('/events?limit='.$limit.'&offset='.$offset);

        return json_decode($response->getBody(), true);
    }

    /**
     * Get a single event.
     *
     * @ApiDoc(
     *   output = "EventBundle\Entity\Event",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the note is not found"
     *   }
     * )
     *
     * @Annotations\View()
     *
     * @param Request $request the request object
     * @param int     $id      the event id
     *
     * @return array
     *
     * @throws NotFoundHttpException when note not exist
     */
    public function getEventAction(Request $request, $id)
    {
        $client = $this->get('guzzle.client.node');
        $response = $client->get('/events/'.$id);

        return json_decode($response->getBody(), true);
    }

    /**
     * Creates a new event from the submitted data.
     *
     * @ApiDoc(
     *   resource = true,
     *   input = "EventBundle\Form\EventType",
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
    public function postEventsAction(Request $request)
    {
        $event = json_decode($request->getContent());

        $client = $this->get('guzzle.client.node');
        $responseBackend = $client->request(
        'POST',
        '/events',
        [
          'json' => $event,
        ]

      );

        $event = json_decode($responseBackend->getBody());

        $response = new Response($responseBackend->getBody());
        $response->setStatusCode($responseBackend->getStatusCode());

        if ($responseBackend->getHeader('Location')) {
            $location = $this->generateUrl('get_events', array(), UrlGeneratorInterface::ABSOLUTE_URL).'/'.$event->id;
            $response->headers->set('Location', $location);
        }

        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * Update existing event from the submitted data or create a new event at a specific location.
     *
     * @ApiDoc(
     *   resource = true,
     *   input = "EventBundle\Form\EventType",
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
     * @throws NotFoundHttpException when event not exist
     */
    public function putEventsAction(Request $request, $id)
    {
        $event = json_decode($request->getContent());
        $client = $this->get('guzzle.client.node');
        $response = $client->request(
        'PUT',
        '/events/'.$id,
        [
          'json' => $event,
        ]

      );

        return json_decode($response->getBody(), true);
    }

    /**
     * Removes a event.
     *
     * @ApiDoc(
     *   resource = true,
     *   statusCodes={
     *     204="Returned when successful"
     *   }
     * )
     *
     * @param Request $request the request object
     * @param int     $id      the event id
     */
    public function deleteEventsAction(Request $request, $id)
    {
        $client = $this->get('guzzle.client.node');
        $response = $client->request('DELETE', '/events/'.$id, ['json' => []]);

        return json_decode($response->getBody(), true);
    }
}
