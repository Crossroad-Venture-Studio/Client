![Crossroad logo](https://crossroad-venture-studio.github.io/Design-System/assets/crossroad.svg)
# *Crossroad Venture Studio:* Client Side Codebase

[Crossroad Venture Studio](crossroadventurestudio.com) is a company focused on creating and building startups. We typically help startups by providing an initial team, strategic direction, and operational support. Contrary to incubators, accelerators and other investment entities, the main added value is on execution rather than financial help.

## Table of content
- [*Crossroad Venture Studio:* Client Side Codebase](#crossroad-venture-studio-client-side-codebase)
  - [Table of content](#table-of-content)
  - [Terms and conditions](#terms-and-conditions)
- [Instaling as a github submodule](#instaling-as-a-github-submodule)
  - [Installation](#installation)
  - [Update](#update)
- [Core](#core)
- [Utilities](#utilities)

## Terms and conditions
By working with *Crossroad*, you are agreeing to the following term and conditions:
- This is a proprietary suite of softwares, tools, framework, design sytem, etc.
- Do not distribute, modify, sell unless consulted and agreed before by William Brendel (brendel.william@gmail.com)

# Instaling as a github submodule

## Installation

Go to your other repo you want this repo to be connected as a submodule and type:

    git submodule add https://github.com/Crossroad-Venture-Studio/Client src/crossroad-client
    git add .
    git commit -am "client submodule"
    git push

## Update

Go to the repo where this module has been installed and type:

    git submodule update --init --recursive
    git submodule foreach --recursive git pull origin main
    git commit -am "client submodule"
    git push

# Core

[![Javascript file](https://crossroad-venture-studio.github.io/Design-System/assets/javascript.svg)](/src/client/core/)

# Utilities

[![Javascript file](https://crossroad-venture-studio.github.io/Design-System/assets/javascript.svg)](/src/client/utils/)