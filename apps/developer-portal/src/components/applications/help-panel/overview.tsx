/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
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

import { TestableComponentInterface } from "@wso2is/core/models";
import { Heading, Hint, PrimaryButton, SecondaryButton } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Divider, Grid, Header } from "semantic-ui-react";
import { OIDCConfigurations } from "./oidc-configurations";
import { SAMLConfigurations } from "./saml-configurations";
import {
    InboundProtocolListItemInterface,
    OIDCApplicationConfigurationInterface,
    SAMLApplicationConfigurationInterface
} from "../../../models";
import { AppState } from "../../../store";
import { ApplicationManagementUtils } from "../../../utils";

/**
 * Proptypes for the applications help panel overview component.
 */
interface HelpPanelOverviewPropsInterface extends TestableComponentInterface {
    inboundProtocols?: InboundProtocolListItemInterface[];
}

/**
 * Applications Help Panel Overview Component.
 *
 * @param {HelpPanelOverviewPropsInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const HelpPanelOverview: FunctionComponent<HelpPanelOverviewPropsInterface> = (
    props: HelpPanelOverviewPropsInterface
): ReactElement => {

    const oidcConfigurations: OIDCApplicationConfigurationInterface = useSelector(
        (state: AppState) => state.application.oidcConfigurations);
    const samlConfigurations: SAMLApplicationConfigurationInterface = useSelector(
        (state: AppState) => state.application.samlConfigurations);
    const { t } = useTranslation();

    const { inboundProtocols } = props;

    const [ isOIDC, setIsOIDC ] = useState<boolean>(false);
    const [ isSAML, setIsSAML ] = useState<boolean>(false);
    const [ isOIDCConfigsLoading, setOIDCConfigsLoading ] = useState<boolean>(false);
    const [ isSAMLConfigsLoading, setSAMLConfigsLoading ] = useState<boolean>(false);

    useEffect(() => {
        if (inboundProtocols == undefined) {
            return;
        }

        if (inboundProtocols.length > 0) {
            inboundProtocols.map((protocol) => {
                if (protocol.type == "oauth2") {
                    setIsOIDC(true);
                } else if (protocol.type == "samlsso") {
                    setIsSAML(true);
                }
            })
        }

    }, [ inboundProtocols ]);

    useEffect(() => {
        if (oidcConfigurations !== undefined) {
            return;
        }

        ApplicationManagementUtils.getOIDCApplicationMeta()
            .finally(() => {
                setOIDCConfigsLoading(false);
            });
    }, [ oidcConfigurations ]);

    useEffect(() => {
        if (samlConfigurations !== undefined) {
            return;
        }

        ApplicationManagementUtils.getSAMLApplicationMeta()
            .finally(() => {
                setSAMLConfigsLoading(false);
            });
    }, [ samlConfigurations ]);

    return (
        <>
            <Grid>
                <Grid.Row textAlign="center">
                    <Grid.Column width={ 16 }>
                        <Heading as="h5">
                            <strong>
                                { t("devPortal:components.applications.helpPanel.tabs.start.content.trySample." +
                                    "title") }
                            </strong>
                        </Heading>
                        <Header.Subheader>
                            { t("devPortal:components.applications.helpPanel.tabs.start.content.trySample." +
                                "subTitle") }
                        </Header.Subheader>
                        <Divider hidden/>
                        <PrimaryButton>
                            { t("devPortal:components.applications.helpPanel.tabs.start.content.trySample." +
                                "btn") }
                        </PrimaryButton>
                        <Divider hidden/>
                        <Divider horizontal>Or</Divider>
                        <Heading ellipsis as="h5">
                            <strong>
                                { t("devPortal:components.applications.helpPanel.tabs.start.content.useSDK." +
                                    "title") }
                            </strong>
                        </Heading>
                        <Header.Subheader>
                            { t("devPortal:components.applications.helpPanel.tabs.start.content.useSDK." +
                                "subTitle") }
                        </Header.Subheader>
                        <Divider hidden/>
                        <Button.Group>
                            <SecondaryButton>
                                { t("devPortal:components.applications.helpPanel.tabs.start.content.useSDK." +
                                    "btns.withSDK") }
                            </SecondaryButton>
                            <Button.Or basic/>
                            <Button>
                                { t("devPortal:components.applications.helpPanel.tabs.start.content.useSDK." +
                                    "btns.withoutSDK") }
                            </Button>
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Heading ellipsis as="h5">
                            <strong>
                                { t("devPortal:components.applications.helpPanel.tabs.start.content.endpoints." +
                                "title") }
                            </strong>
                        </Heading>
                        <Hint>
                            { t("devPortal:components.applications.helpPanel.tabs.start.content.endpoints." +
                                "subTitle") }
                        </Hint>
                        <Divider hidden/>
                        {
                            isOIDC && (
                                <OIDCConfigurations oidcConfigurations={ oidcConfigurations }/>
                            )
                        }
                        {
                            isOIDC && isSAML
                                ? (
                                    <>
                                        <Divider hidden />
                                        <Divider/>
                                        <Divider hidden />
                                    </>
                                ) : null
                        }
                        {
                            isSAML && (
                                <SAMLConfigurations samlConfigurations={ samlConfigurations }/>
                            )
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
};
