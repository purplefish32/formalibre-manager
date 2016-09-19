<?php

namespace FormaLibre\RestBundle\Controller;

use PlatformBundle\Form\PlatformType;
use PlatformBundle\Manager\PlatformManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\View\View;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PlatformController extends FOSRestController implements ClassResourceInterface
{
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
   * @Annotations\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing platforms.")
   * @Annotations\QueryParam(name="limit", requirements="\d+", default="50", description="How many servers to return.")
   *
   * @return View
   */
  public function cgetAction(ParamFetcherInterface $paramFetcher)
  {
    $platforms =  $this->getManager()->all();
    $view = $this->view($platforms, 200);
    return $this->handleView($view);
  }


  /**
   * Returns the required Manager for this controller.
   *
   * @return \FormaLibre\RestBundle\Manager\ServerManager
   */
  private function getManager()
  {
      return $this->get('fl.platform.manager');
  }

  /**
   * @return \AppBundle\Repository\Restricted\RestrictedAccountRepository
   */
  private function getServerRepository()
  {
      return $this->get('fl.doctrine_entity_repository.platform');
  }
}
