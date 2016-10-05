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

class PlatformController extends FOSRestController
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
        $response = $client->get('/platforms?limit='.$limit.'&offset='.$offset);

        return json_decode($response->getBody(), true);
    }

    /**
     * Get a single server.
     *
     * @ApiDoc(
     *   output = "PlatformBundle\Entity\Platform",
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
    public function getPlatformAction(Request $request, $id)
    {
        $client = $this->get('guzzle.client.api');
        $response = $client->get('/platforms/'.$id);

        return json_decode($response->getBody(), true);
    }

    /**
     * Creates a new server from the submitted data.
     *
     * @ApiDoc(
     *   resource = true,
     *   input = "PlatformBundle\Form\PlatformType",
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
    public function postPlatformsAction(Request $request)
    {
        $platforms = json_decode($request->getContent());

        $client = $this->get('guzzle.client.api');
        $responseBackend = $client->request(
        'POST',
        '/platforms',
        [
          'json' => [
              /*$ platforms/model@generate_ctrl(platforms) */
              'name' => $platforms->name,
              'subdomain' => $platforms->subdomain,
              'description' => $platforms->description,
              'plan' => $platforms->plan,
              'end_date' => $platforms->endDate,
              'max_users' => $platforms->maxUsers,
              'max_disk_space' => $platforms->maxDiskSpace,
              'contact_name' => $platforms->contactName,
              'contact_email' => $platforms->contactEmail,
              'contact_phone' => $platforms->contactPhone
              /*$  */
          ],
        ]

      );

        $platforms = json_decode($responseBackend->getBody());

        $response = new Response($responseBackend->getBody());
        $response->setStatusCode($responseBackend->getStatusCode());

        if ($responseBackend->getHeader('Location')) {
            $location = $this->generateUrl('get_platforms', array(), UrlGeneratorInterface::ABSOLUTE_URL).'/'.$platforms->id;
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
     *   input = "PlatformBundle\Form\PlatformType",
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
    public function putPlatformsAction(Request $request, $id)
    {
        $platforms = json_decode($request->getContent());
        $client = $this->get('guzzle.client.api');
        $response = $client->request(
        'PUT',
        '/platforms/'.$id,
        [
          'json' => [
              /*$ platforms/model@generate_ctrl(platforms) */
              'name' => $platforms->name,
              'subdomain' => $platforms->subdomain,
              'description' => $platforms->description,
              'plan' => $platforms->plan,
              'end_date' => $platforms->endDate,
              'max_users' => $platforms->maxUsers,
              'max_disk_space' => $platforms->maxDiskSpace,
              'contact_name' => $platforms->contactName,
              'contact_email' => $platforms->contactEmail,
              'contact_phone' => $platforms->contactPhone
              /*$  */
          ],
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
    public function deletePlatformsAction(Request $request, $id)
    {
        $client = $this->get('guzzle.client.api');
        $response = $client->request('DELETE', '/platforms/'.$id, ['json' => []]);

        return json_decode($response->getBody(), true);
    }
}
