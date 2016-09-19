<?php

namespace FormaLibre\RestBundle\Controller;

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
      $response = $client->get('/platforms?limit=' . $limit . '&offset=' . $offset);

      return json_decode($response->getBody(), true);
  }
  //
  //
  // /**
  //  * Creates a new platform from the submitted data.
  //  */
  // public function postPlatformsAction(Request $request)
  // {
  //     $platform = json_decode($request->getContent());
  //     $client = $this->get('guzzle.client.api');
  //     try {
  //
  //         $response = $client->request(
  //             'POST',
  //             '/platforms',
  //             [
  //                 'json' => $platform
  //             ]
  //
  //         );
  //
  //     } catch (RequestException $e) {
  //         if ($e->getResponse()->getStatusCode() == Response::HTTP_BAD_REQUEST) {
  //             $data = json_decode($e->getResponse()->getBody(), true);
  //             $view = $this->view($data, Response::HTTP_BAD_REQUEST);
  //
  //             return $this->handleView($view);
  //         }
  //     }
  //
  //     return json_decode($response->getBody(), true);
  //
  // }
  //
  //
  // /**
  //  * Removes a platform.
  //  *
  //  * @ApiDoc(
  //  *   resource = true,
  //  *   statusCodes={
  //  *     204="Returned when successful"
  //  *   }
  //  * )
  //  *
  //  * @param Request $request the request object
  //  * @param int     $id      the platform id
  //  *
  //  */
  // public function deletePlatformsAction(Request $request, $id)
  // {
  //   $client = $this->get('guzzle.client.api');
  //   try {
  //       $response = $client->request('DELETE', '/platforms/' . $id);
  //   } catch (RequestException $e) {
  //       if ($e->getResponse()->getStatusCode() == Response::HTTP_NOT_FOUND) {
  //           throw $this->createNotFoundException("Server does not exist.");
  //       }
  //   }
  //   return json_decode($response->getBody(), true);
  // }
}
