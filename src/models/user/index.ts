import { InAppNotification } from '../../models/in-app-notification';

export interface User {
    id: string;
    userId: string;
    identifier: string;
    firstName: string;
    lastName?: string;
    rootOrg: RootOrg;
    tncAcceptedVersion: string;
    tncAcceptedOn: string;
    tncLatestVersion: string;
    promptTnC: boolean;
    tncLatestVersionUrl: string;
    avatar: string;
    managedBy: string;
    locationIds: string;
    framework: any;
    externalIds?: {
        id: string;
        operation: string;
        idType: string;
        provider: string;
    }[];
    declarations?: UserDeclaration[];
    allTncAccepted?: {
        [key: string]: {
            tncAcceptedOn: string,
            version: string
        } | undefined;
    };
}

export enum UserDeclarationOperation {
    EDIT = 'edit',
    ADD = 'add',
    REMOVE = 'remove'
}

export enum UserDeclarationStatus {
    PENDING = 'PENDING',
    VALIDATED = 'VALIDATED',
    REJECTED = 'REJECTED',
    ERROR = 'ERROR'
}

export interface UserDeclaration {
    errorType?: string;
    status?: UserDeclarationStatus;
    operation: UserDeclarationOperation;
    userId: string;
    orgId: string;
    persona: string;
    info: {
        [key: string]: any
    };
}

export interface RootOrg {
    rootOrgId?: string;
    orgName?: string;
    slug?: string;
    hashTagId: string;
}

export interface Location {
    code: string;
    name: string;
    id: string;
    type: string;
}

export enum ConsentStatus {
    ACTIVE = 'ACTIVE',
    REVOKED = 'REVOKED'
}

export interface Consent {
    status?: ConsentStatus;
    userId: string;
    consumerId: string;
    objectId: string;
    objectType?: string;
    expiry?: string;
    lastUpdatedOn?: string;
}

export enum UserFeedStatus {
    READ = 'read',
    UNREAD = 'unread'
}

export enum UserFeedCategory {
    NOTIFICATION = 'Notification'
}

export interface UserFeedEntry<T extends UserFeedCategory = any> {
    identifier: string;
    userId: string;
    category: UserFeedCategory;
    priority: number;
    createdBy: string;
    createdOn: string;
    channel: string;
    status: UserFeedStatus;
    expireOn: string;
    data: UserFeedEntryModelsMap[T];
}

export interface UserFeedEntryModelsMap {
    'Notification': Exclude<InAppNotification, 'id' | 'displayTime' | 'expiry' | 'isRead'>;
}
