<?php

namespace FormaLibre\RestBundle\Manager;

use FormaLibre\RestBundle\Entity\Server;
use FormaLibre\RestBundle\DTO\ServerDTO;
use FormaLibre\RestBundle\Form\Type\ServerType;
use FormaLibre\RestBundle\Form\Handler\FormHandler;
use FormaLibre\RestBundle\Model\ServerInterface;
use FormaLibre\RestBundle\Repository\ServerRepository;
use FormaLibre\RestBundle\Repository\ServerRepositoryInterface;
use FormaLibre\RestBundle\Factory\ServerFactory;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use JMS\DiExtraBundle\Annotation as DI;
use Doctrine\ORM\EntityManager;

class ServerManager implements ManagerInterface
{
    /**
    * @var FormHandlerInterface
    */
    private $formHandler;

    private $em;

    public function __construct(
        FormHandler $formHandler,
        ServerFactory $serverFactory,
        ServerRepositoryInterface $serverRepository
    )
    {
        $this->formHandler = $formHandler;
        $this->factory = $serverFactory;
        $this->repository = $serverRepository;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function get($id) {
        if ($id === null) {
            throw new BadRequestHttpException('A server ID was not specified.');
        }
        return $this->repository->findOneById($id);
    }

    /**
     * @param $limit
     * @param $offset
     * @return array
     */
    public function all($limit = 50, $offset = 0) {

        return $this->repository->findAll()->slice($offset, 2);
        //return $this->repository->findBy(array(), array(), $limit, $offset);
        //return $this->repository->findAllForUser($this->user)->slice($offset, $limit);
    }

    /**
     * @param array $parameters
     * @return mixed
     */
    public function post(array $parameters, array $options = []) {

        $serverDTO = $this->formHandler->handle(
            new ServerDTO(),
            $parameters,
            Request::METHOD_POST,
            $options
        );

        $server = $this->factory->createFromDTO($serverDTO);
        $this->repository->save($server);
        return $server;
    }

    /**
    * @param ServerInterface $serverInterface
    * @param array           $parameters
    * @return mixed
    */
    public function put($resource, array $parameters, array $options = []) {
        return $this->formHandler->handle(
            $resource,
            $parameters,
            "PUT"
        );
    }

    /**
     * @param ServerInterface $serverInterface
     * @param array           $parameters
     * @return mixed
     */
    public function patch($resource, array $parameters, array $options = []) {
        return $this->formHandler->handle(
            $resource,
            $parameters,
            "PATCH"
        );
    }

    /**
    * @param ServerInterface $serverInterface
    * @return mixed
    */
    public function delete($resource) {
        return $this->formHandler->delete($resource);
    }
}
