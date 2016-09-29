<?php

namespace FormaLibre\RestBundle\Manager;

use FormaLibre\RestBundle\DataTransformer\PlatformDataTransformer;
use FormaLibre\RestBundle\DTO\PlatformDTO;
use FormaLibre\RestBundle\Form\Handler\FormHandler;
use FormaLibre\RestBundle\Model\PlatformInterface;
use FormaLibre\RestBundle\Repository\PlatformRepositoryInterface;
use FormaLibre\RestBundle\Factory\PlatformFactory;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class PlatformManager implements ManagerInterface
{
    /**
     * @var FormHandlerInterface
     */
    private $formHandler;

    /**
     * @var PlatformDataTransformer
     */
    private $dataTransformer;

    public function __construct(
        FormHandler $formHandler,
        PlatformDataTransformer $dataTransformer,
        PlatformFactory $platformFactory,
        PlatformRepositoryInterface $platformRepository
    ) {
        $this->formHandler = $formHandler;
        $this->dataTransformer = $dataTransformer;
        $this->factory = $platformFactory;
        $this->repository = $platformRepository;
    }

    /**
     * @param $id
     *
     * @return mixed
     */
    public function get($id)
    {
        if ($id === null) {
            throw new BadRequestHttpException('A platform ID was not specified.');
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
        $platformDTO = $this->formHandler->handle(
            new PlatformDTO(),
            $parameters,
            Request::METHOD_POST,
            $options
        );

        $platform = $this->factory->createFromDTO($platformDTO);

        $this->repository->save($platform);

        return $platform;
    }

    /**
     * @param PlatformInterface $platform
     * @param array             $parameters
     * @param array             $options
     *
     * @return mixed
     */
    public function put($platform, array $parameters, array $options = [])
    {
        $this->guardPlatformImplementsInterface($platform);

        /** @var PlatformInterface $platform */
        $platformDTO = $this->dataTransformer->convertToDTO($platform);
        $platformDTO = $this->formHandler->handle(
            $platformDTO,
            $parameters,
            Request::METHOD_PUT,
            $options
        );
        $this->repository->refresh($platform);
        $platform = $this->dataTransformer->updateFromDTO($platform, $platformDTO);
        $this->repository->save($platform);

        return $platform;
    }

    //TODO check example
    /**
     * @param PlatformInterface $platformInterface
     * @param array             $parameters
     *
     * @return mixed
     */
    public function patch($resource, array $parameters, array $options = [])
    {
        return $this->formHandler->handle(
            $resource,
            $parameters,
            'PATCH'
        );
    }

    //TODO check example
    /**
    * @param PlatformInterface $platformInterface
    *
    * @return mixed
    */
    public function delete($resource)
    {
        return $this->formHandler->delete($resource);
    }

   /**
    * @param $platform
    */
   private function guardPlatformImplementsInterface($platform)
   {
       if (!$platform instanceof PlatformInterface) {
           throw new \InvalidArgumentException('Expected passed Platform to implement PlatformInterface');
       }
   }
}
