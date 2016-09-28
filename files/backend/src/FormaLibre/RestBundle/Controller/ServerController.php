<?php

namespace FormaLibre\RestBundle\Controller;

use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ServerController extends FOSRestController implements ClassResourceInterface
{
    /**
     * Get a single Server.
     *
     * @ApiDoc(
     *   output = "FormaLibre\RestBundle\Entity\Server",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when not found"
     *   }
     * )
     *
     * @param int $id the server id
     *
     * @throws NotFoundHttpException when does not exist
     *
     * @return View
     */
    public function getAction($serverId)
    {
        return $this->getServerManager()->get($serverId);
    }

    /**
     * Gets a collection of Servers.
     *
     * @ApiDoc(
     *   output = "FormaLibre\RestBundle\Entity\Server",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when not found"
     *   }
     * )
     *
     * @throws NotFoundHttpException when does not exist
     *
     * @Annotations\View(serializerGroups={
     *   "servers_all",
     *   "servers_summary"
     * })
     *
     * @return View
     */
    public function cgetAction()
    {
        $servers = $this->getServerManager()->all();
        $view = $this->view($servers, 200);

        return $this->handleView($view);
    }

    /**
     * Create a new Server.
     *
     * @ApiDoc(
     *   output = "FormaLibre\RestBundle\Entity\Server",
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
            $server = $this->getServerManager()->post($request->request->all());

            $additionalHeaders = [
                'Location' => $this->generateUrl('get_servers', array(), UrlGeneratorInterface::ABSOLUTE_URL).'/'.$server->getId(),
            ];

            $view = $this->view($server, Response::HTTP_CREATED, $additionalHeaders);

            return $this->handleView($view);
        } catch (InvalidFormException $e) {
            return $e->getForm();
        }
    }

    /**
     * Replaces existing Server from the submitted data.
     *
     * @ApiDoc(
     *   resource = true,
     *   input = "FormaLibre\RestBundle\Form\ServerType",
     *   output = "FormaLibre\RestBundle\Entity\Server",
     *   statusCodes = {
     *     204 = "Returned when successful",
     *     400 = "Returned when errors",
     *     404 = "Returned when not found"
     *   }
     * )
     *
     * @param Request $request the request object
     * @param int     $id      the server id
     *
     * @return FormTypeInterface|RouteRedirectView
     *
     * @throws NotFoundHttpException when does not exist
     */
    public function putAction(Request $request, $id)
    {
        $requestedServer = $this->getServerRepository()->findOneById($id);

        try {
            $server = $this->getServerManager()->put(
                $requestedServer,
                $request->request->all()
            );
            $routeOptions = [
                'serverId' => $server->getId(),
            ];

            return $this->routeRedirectView('get_servers', $routeOptions, Response::HTTP_NO_CONTENT);
        } catch (InvalidFormException $e) {
            return $e->getForm();
        }
    }

   /**
    * Deletes a specific Server by ID.
    *
    * @ApiDoc(
    *  description="Deletes an existing Server",
    *  statusCodes={
    *         204="Returned when an existing Server has been successfully deleted",
    *         403="Returned when trying to delete a non existent Server"
    *     }
    * )
    *
    * @param int         $id       the server id
    *
    * @return View
    */
   public function deleteAction($id)
   {
       $requestedServer = $this->getServerRepository()->findOneById($id);
       //return $requestedServer;
       $this->getServerManager()->delete($requestedServer);

       return new View(null, Response::HTTP_NO_CONTENT);
   }

    /**
     * Returns the required Manager for this controller.
     *
     * @return \FormaLibre\RestBundle\Manager\ServerManager
     */
    private function getServerManager()
    {
        return $this->get('fl.server.manager');
    }

    /**
     * @return \FormaLibre\RestBundle\Repository\Doctrine\DoctrineServerRepository
     */
    private function getServerRepository()
    {
        return $this->get('fl.doctrine_entity_repository.server');
    }
}
