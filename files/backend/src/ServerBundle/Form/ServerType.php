<?php

namespace ServerBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ServerType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('ip', null, array('required' => false))
            ->add('name', null, array('required' => false))
            ->add('description', null, array('required' => false))
            ->add('provider', null, array('required' => false))
            ->add('type', null, array('required' => true))
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'csrf_protection' => false,
            'data_class' => 'ServerBundle\Entity\Server'
        ));
    }

    public function getName()
    {
        return '';
    }
}
