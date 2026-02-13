#!/usr/bin/env bash

set -o errexit

# instalar las dependencias
pip install --upgrade pip
pip install -r requirements.txt

# Ejecutar migracion
flask db upgrade
