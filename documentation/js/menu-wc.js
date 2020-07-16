'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">mobicare-test documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-aa0ed1a22ea882cce04b19b0c0453a93"' : 'data-target="#xs-components-links-module-AppModule-aa0ed1a22ea882cce04b19b0c0453a93"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-aa0ed1a22ea882cce04b19b0c0453a93"' :
                                            'id="xs-components-links-module-AppModule-aa0ed1a22ea882cce04b19b0c0453a93"' }>
                                            <li class="link">
                                                <a href="components/AddCollaboratorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddCollaboratorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddSectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddSectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CollaboratorsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CollaboratorsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomCollaboratorsListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CustomCollaboratorsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomSectorsListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CustomSectorsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCollaboratorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditCollaboratorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationOptionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavigationOptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SectorsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SectorsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CollaboratorsService.html" data-type="entity-link">CollaboratorsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SectorsService.html" data-type="entity-link">SectorsService</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});