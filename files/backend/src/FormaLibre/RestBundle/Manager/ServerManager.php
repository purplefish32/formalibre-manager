<?php

namespace FormaLibre\RestBundle\Manager;

use FormaLibre\RestBundle\DataTransformer\ServerDataTransformer;
use FormaLibre\RestBundle\DTO\ServerDTO;
use FormaLibre\RestBundle\Form\Handler\FormHandler;
use FormaLibre\RestBundle\Model\ServerInterface;
use FormaLibre\RestBundle\Repository\ServerRepositoryInterface;
use FormaLibre\RestBundle\Factory\ServerFactory;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ServerManager implements ManagerInterface
{
    /**
     * @var FormHandlerInterface
     */
    private $formHandler;

    /**
     * @var ServerDataTransformer
     */
    private $dataTransformer;

    public function __construct(
        FormHandler $formHandler,
        ServerDataTransformer $dataTransformer,
        ServerFactory $serverFactory,
        ServerRepositoryInterface $serverRepository
    ) {
        $this->formHandler = $formHandler;
        $this->dataTransformer = $dataTransformer;
        $this->factory = $serverFactory;
        $this->repository = $serverRepository;
    }

    /**
     * @param $id
     *
     * @return mixed
     */
    public function get($id)
    {
        if ($id === null) {
            throw new BadRequestHttpException('A server ID was not specified.');
        }

        return $this->repository->findOneById($id);
    }

    /**
     * @param $limit
     * @param $offset
     *
     * @return array
     */
    public function all($limit = 50, $offset = 0)
    {
        return $this->repository->findAll()->slice($offset, $limit);
    }

    /**
     * @param array $parameters
     *
     * @return mixed
     */
    public function post(array $parameters, array $options = [])
    {
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
     * @param ServerInterface $server
     * @param array           $parameters
     * @param array           $options
     *
     * @return mixed
     */
    public function put($server, array $parameters, array $options = [])
    {
        $this->guardServerImplementsInterface($server);

        /** @var ServerInterface $server */
        $serverDTO = $this->dataTransformer->convertToDTO($server);
        $serverDTO = $this->formHandler->handle(
            $serverDTO,
            $parameters,
            Request::METHOD_PUT,
            $options
        );
        $this->repository->refresh($server);
        $server = $this->dataTransformer->updateFromDTO($server, $serverDTO);
        $this->repository->save($server);

        return $server;
    }

    /**
     * @param ServerInterface $serverInterface
     *
     * @return mixed
     */
    public function delete($resource)
    {
        $this->guardServerImplementsInterface($resource);

        return $this->repository->delete($resource);
    }

   /**
    * @param $server
    */
   private function guardServerImplementsInterface($server)
   {
       if (!$server instanceof ServerInterface) {
           throw new \InvalidArgumentException('Expected passed Server to implement ServerInterface');
       }
   }
}
