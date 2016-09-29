<?php

namespace FormaLibre\RestBundle\Controller;

use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class PlatformController extends FOSRestController implements ClassResourceInterface
{
    /**
     * Get a single Platform.
     *
     * @ApiDoc(
     *   output = "FormaLibre\RestBundle\Entity\Platform",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when not found"
     *   }
     * )
     *
     * @param int $id the platform id
     *
     * @throws NotFoundHttpException when does not exist
     *
     * @return View
     */
    public function getAction($id)
    {
        return $this->getPlatformManager()->get($id);
    }

  /**
   * Gets a collection of Platforms.
   *
   * @ApiDoc(
   *   output = "FormaLibre\RestBundle\Entity\Platform",
   *   statusCodes = {
   *     200 = "Returned when successful",
   *     404 = "Returned when not found"
   *   }
   * )
   *
   * @throws NotFoundHttpException when does not exist
   *
   * @Annotations\View(serializerGroups={
   *   "platforms_all",
   *   "platforms_summary"
   * })
   *
   * @return View
   */
  public function cgetAction()
  {
      $platforms = $this->getPlatformManager()->all();
      $view = $this->view($platforms, 200);

      return $this->handleView($view);
  }

  /**
   * Create a new Platform.
   *
   * @ApiDoc(
   *   output = "FormaLibre\RestBundle\Entity\Platform",
   *   statusCodes = {
   *     200 = "Returned when successful",
   *     404 = "Returned when not found"
   *   }
   * )
   *
   * @param JSON $data
   *
   * @throws NotFoundHttpException when does not exist
   */
  public function postAction(Request $request)
  {
      try {
          $platform = $this->getPlatformManager()->post($request->request->all());

          $additionalHeaders = [
              'Location' => $this->generateUrl('get_platforms', array(), UrlGeneratorInterface::ABSOLUTE_URL).'/'.$platform->getId(),
          ];

          $view = $this->view($platform, Response::HTTP_CREATED, $additionalHeaders);

          return $this->handleView($view);
      } catch (InvalidFormException $e) {
          return $e->getForm();
      }
  }

  /**
   * Replaces existing Platform from the submitted data.
   *
   * @ApiDoc(
   *   resource = true,
   *   input = "FormaLibre\RestBundle\Form\PlatformType",
   *   output = "FormaLibre\RestBundle\Entity\Platform",
   *   statusCodes = {
   *     204 = "Returned when successful",
   *     400 = "Returned when errors",
   *     404 = "Returned when not found"
   *   }
   * )
   *
   * @param Request $request the request object
   * @param int     $id      the platform id
   *
   * @return FormTypeInterface|RouteRedirectView
   *
   * @throws NotFoundHttpException when does not exist
   */
  public function putAction(Request $request, $id)
  {
      $requestedPlatform = $this->getPlatformRepository()->findOneById($id);

      try {
          $platform = $this->getPlatformManager()->put(
              $requestedPlatform,
              $request->request->all()
          );
          $routeOptions = [
              'id' => $platform->getId(),
          ];

          return $this->routeRedirectView('get_platforms', $routeOptions, Response::HTTP_NO_CONTENT);
      } catch (InvalidFormException $e) {
          return $e->getForm();
      }
  }

 /**
  * Deletes a specific Platform by ID.
  *
  * @ApiDoc(
  *  description="Deletes an existing Platform",
  *  statusCodes={
  *         204="Returned when an existing Platform has been successfully deleted",
  *         403="Returned when trying to delete a non existent Platform"
  *     }
  * )
  *
  * @param int         $id       the platform id
  *
  * @return View
  */
 public function deleteAction($id)
 {
     $platform = $this->getPlatformRepository()->findOneById($id);
     $this->getPlatformManager()->delete($platform);

     return new View(null, Response::HTTP_NO_CONTENT);
 }

  /**
   * Returns the required Manager for this controller.
   *
   * @return \FormaLibre\RestBundle\Manager\PlatformManager
   */
  private function getPlatformManager()
  {
      return $this->get('fl.platform.manager');
  }

  /**
   * @return \FormaLibre\RestBundle\Repository\Doctrine\DoctrinePlatformRepository
   */
  private function getPlatformRepository()
  {
      return $this->get('fl.doctrine_entity_repository.platform');
  }
}
