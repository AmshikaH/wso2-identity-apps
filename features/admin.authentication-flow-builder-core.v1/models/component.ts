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

import { Base } from "./base";

/**
 * Interface for a component.
 */
export type Component<T = any> = Base<T>;

export enum ComponentTypes {
    Input = "INPUT",
    Button = "BUTTON",
    Divider = "DIVIDER",
    Choice = "CHOICE",
    Image = "IMAGE",
    RichText = "RICH_TEXT",
    Typography = "TYPOGRAPHY",
}

export enum InputVariants {
    Text = "TEXT",
    Password = "PASSWORD",
    Email = "EMAIL",
    Telephone = "TELEPHONE",
    Number = "NUMBER",
    Checkbox = "CHECKBOX",
}

export enum ButtonVariants {
    Primary = "PRIMARY",
    Secondary = "SECONDARY",
    Text = "TEXT"
}

export enum TypographyVariants {
    H1 = "H1",
    H2 = "H2",
    H3 = "H3",
    H4 = "H4",
    H5 = "H5",
    H6 = "H6",
    Body1 = "BODY1",
    Body2 = "BODY2"
}
