<?php

namespace FormaLibre\RestBundle\Controller;

use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FormaLibre\RestBundle\Manager\ServerManager;
use Symfony\Component\HttpFoundation\Request;
//use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

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
        $servers =  $this->getServerManager()->all();
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
    *
    */
    public function postAction(Request $request)
    {
        try {

            $server = $this->getServerManager()->post($request->request->all());

            $routeOptions = [
                'serverId'  => $server->getId()
            ];

            return $this->routeRedirectView('get_server', $routeOptions, Response::HTTP_CREATED);

        } catch (InvalidFormException $e) {

            return $e->getForm();
        }
    }

    /**
     * Replaces existing Server from the submitted data
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
                'serverId'  => $server->getId()
            ];

            return $this->routeRedirectView('get_servers', $routeOptions, Response::HTTP_NO_CONTENT);

        } catch (InvalidFormException $e) {
            return $e->getForm();
        }
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
     * @return \AppBundle\Repository\Restricted\RestrictedAccountRepository
     */
    private function getServerRepository()
    {
        return $this->get('fl.doctrine_entity_repository.server');
    }

}
