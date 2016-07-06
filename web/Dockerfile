FROM php:7.0.7-apache

MAINTAINER Donovan Tengblad

RUN a2enmod rewrite

RUN apt-get update && apt-get install -y \
  vim

RUN docker-php-ext-install pdo pdo_mysql

COPY ./slim.conf /etc/apache2/sites-available/slim.conf

RUN a2dissite 000-default && a2ensite slim.conf

COPY ./php.ini /usr/local/etc/php/

CMD ["apache2-foreground"]
