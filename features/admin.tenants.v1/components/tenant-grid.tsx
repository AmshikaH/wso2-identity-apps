/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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

import Grid from "@oxygen-ui/react/Grid";
import { IdentifiableComponentInterface } from "@wso2is/core/models";
import React, { FunctionComponent, ReactElement } from "react";
import TenantCard from "./tenant-card";
import WithTenantGridPlaceholders from "./with-tenant-grid-placeholders";
import useGetTenants from "../api/use-get-tenants";
import { Tenant } from "../models/tenants";

/**
 * Props interface of {@link TenantsPage}
 */
export interface TenantGridProps extends IdentifiableComponentInterface {
    onAddTenantModalTrigger: () => void;
}

/**
 * Grid layout for listing all the tenants.
 *
 * @param props - Props injected to the component.
 * @returns Tenant listing grid component.
 */
const TenantGrid: FunctionComponent<TenantGridProps> = ({
    onAddTenantModalTrigger,
    ["data-componentid"]: componentId = "tenant-grid"
}: TenantGridProps): ReactElement => {
    const { data: tenantList, isLoading: isTenantListLoading, mutate: mutateTenantList } = useGetTenants();

    return (
        <WithTenantGridPlaceholders
            data-componentid={ componentId }
            tenantList={ tenantList }
            isTenantListLoading={ isTenantListLoading }
            onAddTenantModalTrigger={ onAddTenantModalTrigger }
        >
            { tenantList?.tenants?.map((tenant: Tenant) => (
                <Grid key={ tenant.id } xs={ 12 } sm={ 12 } md={ 6 } lg={ 4 } xl={ 3 }>
                    <TenantCard tenant={ tenant } onUpdate={ () => mutateTenantList() } />
                </Grid>
            )) }
        </WithTenantGridPlaceholders>
    );
};

export default TenantGrid;
