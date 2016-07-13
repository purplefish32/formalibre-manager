<?php

namespace PlatformBundle\Controller;

use PlatformBundle\Form\PlatformType;
use PlatformBundle\Manager\PlatformManager;
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

class PlatformController extends FOSRestController
{
    /**
     * return \PlatformBundle\PlatformManager
     */
    public function getPlatformManager()
    {
        return $this->get('app.platform_manager');
    }

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
        $repository = $this->getDoctrine()
          ->getRepository('PlatformBundle:Platform');
        $platforms = $repository->findBy(
            array(),
            array('id' => 'ASC'),
            $limit,
            $offset
        );
        return $platforms;
    }

    /**
     * Get a single platform.
     *
     * @ApiDoc(
     *   output = "PlatformBundle\Entity\Platform",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the note is not found"
     *   }
     * )
     *
     * @param Request $request the request object
     * @param int     $id      the platform id
     *
     * @return array
     *
     * @throws NotFoundHttpException when note not exist
     */
    public function getPlatformAction(Request $request, $id)
    {
        $repository = $this->getDoctrine()
          ->getRepository('PlatformBundle:Platform');
        $platform = $repository->findOneBy(array('id' => $id));
        if (false === $platform) {
            throw $this->createNotFoundException("Platform does not exist.");
        }
        return $platform;
    }

    /**
     * Creates a new platform from the submitted data.
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
        $data = json_decode($request->getContent(), true);
        $platformManager = $this->getPlatformManager();
        $platform = $platformManager->createPlatform();
        $form = $this->createForm(PlatformType::class, $platform);
        $form->submit($data);
        if ($form->isValid()) {
            $platformManager->savePlatform($platform);
            $view = $this->view($platform, Response::HTTP_OK);

            return $this->handleView($view);
        }
        $view = $this->view($form->getErrors(), Response::HTTP_BAD_REQUEST);

        return $this->handleView($view);
    }

    /**
     * Update existing platform from the submitted data or create a new platform at a specific location.
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
     * @throws NotFoundHttpException when platform not exist
     */
    public function putPlatformsAction(Request $request, $id)
    {
        $repository = $this->getDoctrine()
          ->getRepository('PlatformBundle:Platform');
        $platform = $repository->findOneById(array('id' => $id));

        if (NULL === $platform) {
            $platformManager = $this->getPlatformManager();
            $platform = $platformManager->createPlatform();
            $statusCode = Response::HTTP_CREATED;
        } else {
            $statusCode = Response::HTTP_NO_CONTENT;
        }

        $form = $this->createForm(PlatformType::class, $platform);
        $form->submit($request);

        if ($form->isValid()) {
            $platformManager->persistAndFlush($platform);
            die("flushed");
            //return $this->routeRedirectView('get_note', array('id' => $note->id), $statusCode);
        }

        /*echo dump($form->getTransformationFailure());
        var_dump($this->getErrorMessages($form));
        die();

        $view = $this->view($form->getErrors(), Response::HTTP_BAD_REQUEST);
        return $this->handleView($view);
        return $form;*/
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
        $platformManager = $this->getPlatformManager();
        $repository = $this->getDoctrine()
          ->getRepository('PlatformBundle:Platform');
        $platform = $repository->findOneBy(array('id' => $id));

        if (NULL === $platform) {
            throw $this->createNotFoundException("Platform does not exist.");
        }

        $platformManager->removePlatform($platform);

        return $this->view(null, Response::HTTP_NO_CONTENT);
    }
}
