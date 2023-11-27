/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { CardContent } from "@oxygen-ui/react";
import {
    ArrowLoopRightUserIcon,
    BuildingGearIcon,
    EnvelopeAtIcon,
    EnvelopeMagnifyingGlassIcon,
    GearIcon,
    HexagonTwoIcon,
    PadlockAsteriskIcon,
    ShieldCheckIcon,
    ShieldUserPencilIcon,
    UserDatabaseIcon,
    UserDocumentIcon,
    UserGearIcon,
    UserPlusIcon
} from "@oxygen-ui/react-icons";
import Card from "@oxygen-ui/react/Card";
import Typography from "@oxygen-ui/react/Typography";
import { IdentifiableComponentInterface, LoadableComponentInterface } from "@wso2is/core/models";
import { ContentLoader, GenericIcon } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement, SyntheticEvent } from "react";
import { serverConfigurationConfig } from "../../../extensions";
import { AppConstants, history } from "../../core";
import "./governance-connector-grid.scss";
import { getSettingsSectionIcons } from "../configs/ui";
import { ServerConfigurationsConstants } from "../constants/server-configurations-constants";

/**
 * Props for the Governance connector configuration categories page.
 */
export interface GovernanceConnectorCategoriesGridInterface extends
    IdentifiableComponentInterface, LoadableComponentInterface {
        /**
         * Connector categories.
         */
        connectorCategories: any;
        /**
         * Dynamic connector catergories.
         */
        dynamicConnectors: any;
    }

/**
 * Choose the application template from this page.
 *
 * @param props - Props injected to the component.
 *
 * @returns Application template select page.
 */
const GovernanceConnectorCategoriesGrid: FunctionComponent<GovernanceConnectorCategoriesGridInterface> = (
    props: GovernanceConnectorCategoriesGridInterface
): ReactElement => {
    const {
        isLoading,
        ["data-componentid"]: componentId,
        connectorCategories,
        dynamicConnectors
    } = props;

    /**
     * Handles connector selection.
     *
     * @param e - Click event.
     * @param id - Id of the template.
     */
    const handleConnectorSelection = (e: SyntheticEvent, route: string): void => {
        history.push(route);
    };

    const handleDynamicConnectorSelection = (e: SyntheticEvent, connector: any): void => {
        history.push(AppConstants.getPaths()
            .get("GOVERNANCE_CONNECTOR_EDIT")
            .replace(":categoryId",
                connector.categoryId)
            .replace(":connectorId", connector.id));
    };

    if (isLoading) {
        return <ContentLoader dimmer />;
    }

    const resolveConnectorCategoryIcon = (id : string): ReactElement => {
        switch (id) {
            case ServerConfigurationsConstants.IDENTITY_GOVERNANCE_PASSWORD_POLICIES_ID:
                return (
                    <PadlockAsteriskIcon fill="primary" className="icon" />
                );
            case ServerConfigurationsConstants.CAPTCHA_FOR_SSO_LOGIN_CONNECTOR_ID:
                return (
                    <GenericIcon
                        size="micro"
                        icon={ getSettingsSectionIcons().botDetection }
                        transparent
                        shape={ "square" }
                    />
                );
            case ServerConfigurationsConstants.ORGANIZATION_SELF_SERVICE_CONNECTOR_ID:
                return (
                    <BuildingGearIcon className="icon" />
                );
            case ServerConfigurationsConstants.USER_ONBOARDING_CONNECTOR_ID:
                return (
                    <UserPlusIcon className="icon" />
                );
            case ServerConfigurationsConstants.LOGIN_ATTEMPT_SECURITY_CONNECTOR_CATEGORY_ID:
                return (
                    <HexagonTwoIcon className="icon" />
                );
            case ServerConfigurationsConstants.MFA_CONNECTOR_CATEGORY_ID:
                return (
                    <ShieldCheckIcon className="icon" />
                );
            case ServerConfigurationsConstants.SESSION_MANAGEMENT_CONNECTOR_ID:
                return (
                    <UserDatabaseIcon className="icon" />
                );
            case ServerConfigurationsConstants.ASK_PASSWORD_CONNECTOR_ID:
                return (
                    <UserGearIcon className="icon" />
                );
            case ServerConfigurationsConstants.ALTERNATIVE_LOGIN_IDENTIFIER:
                return (
                    <ArrowLoopRightUserIcon className="icon" />
                );
            case ServerConfigurationsConstants.MULTI_ATTRIBUTE_LOGIN_CONNECTOR_ID:
                return (
                    <UserDocumentIcon className="icon" />
                );
            case ServerConfigurationsConstants.USERNAME_VALIDATION:
                return (
                    <GenericIcon
                        size="micro"
                        icon={ getSettingsSectionIcons().usernameValidation }
                        transparent
                        shape={ "square" }
                    />
                );
            case ServerConfigurationsConstants.SELF_SIGN_UP_CONNECTOR_ID:
                return (
                    <UserPlusIcon className="icon" />
                );
            case ServerConfigurationsConstants.LOGIN_ATTEMPT_SECURITY:
                return (
                    <HexagonTwoIcon className="icon" />
                );
            case ServerConfigurationsConstants.PASSWORD_RECOVERY:
                return (
                    <ShieldUserPencilIcon className="icon" />
                );
            case ServerConfigurationsConstants.USERNAME_RECOVERY:
                return (
                    <EnvelopeAtIcon className="icon" />
                );
            case ServerConfigurationsConstants.EMAIL_DOMAIN_DISCOVERY:
                return (
                    <EnvelopeMagnifyingGlassIcon className="icon" />
                );
            default:
                return <GearIcon fill="primary" className="icon" />;
        }
    };

    return (
        <div>
            { connectorCategories?.map((category: any, index: number) => {
                return (
                    <div className="catergory-container" key={ index }>
                        <Typography
                            color="text.primary"
                            className="mb-3"
                            variant="h4"
                        >
                            { category?.title }
                        </Typography>
                        <div className="governance-connector-list-grid-wrapper" data-componentid={ componentId }>
                            <div className="governance-connector-list-grid">
                                {
                                    category.connectors.map((connector: any) => {
                                        if (!serverConfigurationConfig.connectorsToHide.includes(connector.id)) {
                                            return (
                                                <Card
                                                    key={ connector.id }
                                                    className="governance-connector"
                                                    onClick={ (e: SyntheticEvent) => handleConnectorSelection(e,
                                                        connector.route) }
                                                >
                                                    <CardContent className="governance-connector-header">
                                                        <div className="governance-connector-image-container">
                                                            { resolveConnectorCategoryIcon(connector.id) }
                                                        </div>
                                                        <div>
                                                            <Typography variant="h6">
                                                                { connector.header }
                                                            </Typography>
                                                        </div>
                                                    </CardContent>
                                                    <CardContent>
                                                        <Typography variant="body2" color="text.secondary">
                                                            { connector.description }
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            );
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                );
            }) }
            {
                (serverConfigurationConfig.dynamicConnectors && dynamicConnectors.length > 0) && (
                    <div className="catergory-container">
                        <Typography
                            color="text.primary"
                            className="mb-3"
                            variant="h4"
                        >
                            Other Settings
                        </Typography>
                        <div className="governance-connector-list-grid-wrapper" data-componentid={ componentId }>
                            <div className="governance-connector-list-grid">
                                {
                                    dynamicConnectors.map((connector: any) => {
                                        return (
                                            <Card
                                                key={ connector.id }
                                                className="governance-connector"
                                                onClick={ (e: SyntheticEvent) => handleDynamicConnectorSelection(e,
                                                    connector) }
                                            >
                                                <CardContent className="governance-connector-header">
                                                    <div className="governance-connector-image-container">
                                                        { resolveConnectorCategoryIcon(connector.id) }
                                                    </div>
                                                    <div>
                                                        <Typography variant="h6">
                                                            { connector.friendlyName }
                                                        </Typography>
                                                    </div>
                                                </CardContent>
                                                <CardContent>
                                                    <Typography variant="body2" color="text.secondary">
                                                        { `Configure settings related to 
                                                            ${ connector.friendlyName.toLowerCase() } connector.` }
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

/**
 * Default props for the component.
 */
GovernanceConnectorCategoriesGrid.defaultProps = {
    "data-componentid": "governance-connector-category-grid"
};

export default GovernanceConnectorCategoriesGrid;