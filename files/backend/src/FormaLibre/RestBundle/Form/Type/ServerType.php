<?php

namespace FormaLibre\RestBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class ServerType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('ip', TextType::class, array(
                'required' => false,
            ))
            ->add('name', TextType::class, array(
                'required' => false,
            ))
            ->add('description', TextType::class, array(
                'required' => false,
            ))
            ->add('provider', TextType::class, array(
                'required' => false,
            ))
            ->add('type', TextType::class, array(
                'required' => true,
            ))
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'FormaLibre\RestBundle\Entity\Server',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'server';
    }
}
