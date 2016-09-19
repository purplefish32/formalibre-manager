<?php

namespace FormaLibre\RestBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class PlatformType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, array(
                'required' => false,
            ))
            ->add('subdomain', TextType::class, array(
              'required' => false,
            ))
            ->add('description', TextType::class, array(
                'required' => false,
            ))
            ->add('plan', TextType::class, array(
              'required' => false,
            ))
            ->add('endDate', TextType::class, array(
                'required' => false,
            ))
            ->add('maxUsers', TextType::class, array(
                'required' => false,
            ))
            ->add('maxDiskSpace', TextType::class, array(
                'required' => false,
            ))
            ->add('contactName', TextType::class, array(
                'required' => false,
            ))
            ->add('contactEmail', TextType::class, array(
                'required' => false,
            ))
            ->add('contactPhone', TextType::class, array(
                'required' => false,
            ))
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'FormaLibre\RestBundle\Entity\Platform',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'platform';
    }
}
