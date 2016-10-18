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

class ClientController extends FOSRestController implements ClassResourceInterface
{
    /**
     * Get a single Client.
     *
     * @ApiDoc(
     *   output = "FormaLibre\RestBundle\Entity\Client",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when not found"
     *   }
     * )
     *
     * @param int $id the client id
     *
     * @throws NotFoundHttpException when does not exist
     *
     * @return View
     */
    public function getAction($id)
    {
        return $this->getClientManager()->get($id);
    }

    /**
     * Gets a collection of Clients.
     *
     * @ApiDoc(
     *   output = "FormaLibre\RestBundle\Entity\Client",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when not found"
     *   }
     * )
     *
     * @throws NotFoundHttpException when does not exist
     *
     * @Annotations\View(serializerGroups={
     *   "clients_all",
     *   "clients_summary"
     * })
     *
     * @return View
     */
    public function cgetAction()
    {
        $clients = $this->getClientManager()->all();
        $view = $this->view($clients, 200);

        return $this->handleView($view);
    }

    /**
     * Create a new Client.
     *
     * @ApiDoc(
     *   output = "FormaLibre\RestBundle\Entity\Client",
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
            $client = $this->getClientManager()->post($request->request->all());

            $additionalHeaders = [
                'Location' => $this->generateUrl('get_clients', array(), UrlGeneratorInterface::ABSOLUTE_URL).'/'.$client->getId(),
            ];

            $view = $this->view($client, Response::HTTP_CREATED, $additionalHeaders);

            return $this->handleView($view);
        } catch (InvalidFormException $e) {
            return $e->getForm();
        }
    }

    /**
     * Replaces existing Client from the submitted data.
     *
     * @ApiDoc(
     *   resource = true,
     *   input = "FormaLibre\RestBundle\Form\ClientType",
     *   output = "FormaLibre\RestBundle\Entity\Client",
     *   statusCodes = {
     *     204 = "Returned when successful",
     *     400 = "Returned when errors",
     *     404 = "Returned when not found"
     *   }
     * )
     *
     * @param Request $request the request object
     * @param int     $id      the client id
     *
     * @return FormTypeInterface|RouteRedirectView
     *
     * @throws NotFoundHttpException when does not exist
     */
    public function putAction(Request $request, $id)
    {
        $requestedClient = $this->getClientRepository()->findOneById($id);

        try {
            $client = $this->getClientManager()->put(
                $requestedClient,
                $request->request->all()
            );
            $routeOptions = [
                'id' => $client->getId(),
            ];

            return $this->routeRedirectView('get_clients', $routeOptions, Response::HTTP_NO_CONTENT);
        } catch (InvalidFormException $e) {
            return $e->getForm();
        }
    }

   /**
    * Deletes a specific Client by ID.
    *
    * @ApiDoc(
    *  description="Deletes an existing Client",
    *  statusCodes={
    *         204="Returned when an existing Client has been successfully deleted",
    *         403="Returned when trying to delete a non existent Client"
    *     }
    * )
    *
    * @param int         $id       the client id
    *
    * @return View
    */
   public function deleteAction($id)
   {
       $requestedClient = $this->getClientRepository()->findOneById($id);
       $this->getClientManager()->delete($requestedClient);

       return new View(null, Response::HTTP_NO_CONTENT);
   }

    /**
     * Returns the required Manager for this controller.
     *
     * @return \FormaLibre\RestBundle\Manager\ClientManager
     */
    private function getClientManager()
    {
        return $this->get('fl.client.manager');
    }

    /**
     * @return \FormaLibre\RestBundle\Repository\Doctrine\DoctrineClientRepository
     */
    private function getClientRepository()
    {
        return $this->get('fl.doctrine_entity_repository.client');
    }

}
