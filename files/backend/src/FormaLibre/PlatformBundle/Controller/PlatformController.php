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
use Symfony\Component\Form\FormInterface;
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
        $view = $this->view($platforms, Response::HTTP_OK);
        return $this->handleView($view);
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
        $view = $this->view($platform, Response::HTTP_OK);
        return $this->handleView($view);
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
        //return($request->getHeaders());
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

        $errors = $this->getErrorsFromForm($form);
        $data = [
            'message' => 'Validation error',
            'errors' => $errors
        ];

        $view = $this->view($data, Response::HTTP_BAD_REQUEST);

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
        $platformManager = $this->getPlatformManager();

        $platform = $platformManager->loadPlatform($id);

        if (!$platform) {
            throw $this->createNotFoundException();
        }

        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(PlatformType::class, $platform);
        $form->submit($data);

        if ($form->isValid()) {
            $platformManager->savePlatform($platform);
            $view = $this->view(null, Response::HTTP_NO_CONTENT);
            return $this->handleView($view);
        }

        $errors = $this->getErrorsFromForm($form);
        $data = [
            'message' => 'Validation error',
            'errors' => $errors
        ];

        $view = $this->view($form->getErrors(), $statusCode);
        return $this->handleView($view);
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
            throw $this->createNotFoundException();
        }

        $platformManager->removePlatform($platform);

        return $this->view(null, Response::HTTP_NO_CONTENT);
    }

    private function getErrorsFromForm(FormInterface $form)
    {
        $errors = array();
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }
        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->getErrorsFromForm($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }
        return $errors;
    }

}
