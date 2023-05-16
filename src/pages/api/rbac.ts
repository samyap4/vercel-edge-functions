import { NextRequest, NextResponse } from 'next/server';

export const config = {
    runtime: 'experimental-edge',
    location: 'iad1'
  };

export default (req: NextRequest) => {
    const claims = {
        "id": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
        "userType": 1,
        "userStatusId": "fbf8794f-0f24-e811-b1e8-a0afbd34288e",
        "agencyId": null,
        "clientId": null,
        "managerId": null,
        "assistantId": null,
        "userName": "Sam RBAC",
        "passwordHash": "AHKB5QRyGnwNw4r9NtsHDnKaLPvPrIxDTKtillFhZPU0aaHRRCoqpM6YVjWdjyqKLw==",
        "securityStamp": "b99d0c91-844c-49b8-8bd2-7efcd3b12159",
        "email": "sam@rbac.com",
        "emailConfirmed": false,
        "phoneNumber": "(602) 579-4742",
        "phoneNumberConfirmed": false,
        "twoFactorEnabled": false,
        "lockoutEndDateUtc": null,
        "lockoutEnabled": false,
        "accessFailedCount": 0,
        "lastLoginDateUtc": "2022-07-13T20:37:23.737",
        "lastPasswordChangedDateUtc": "2022-05-31T15:54:46.35",
        "firstName": "c",
        "lastName": "b",
        "title": "dev",
        "howHear": null,
        "description": "auth auth auth the app \r\nforcibly with a scream\r\nscarily scarily life is but an identity scheme",
        "modifiedDateUtc": "2022-07-10T14:44:06.837",
        "createdBy": "SYSTEM",
        "createdDateUtc": "2022-05-31T15:50:57.45",
        "applicationUserAvatarId": null,
        "sessionId": null,
        "hasAcceptedTerms": false,
        "isExternal": false,
        "cacheGridSettings": false,
        "lastSessionStartDateTimeUtc": "2022-07-10T14:44:06.8",
        "approvalLimitAmount": null,
        "fullName": "c b",
        "agency": null,
        "applicationUserAvatar": null,
        "assistant": null,
        "client": null,
        "manager": null,
        "userStatus": null,
        "alerts": [],
        "applicationUserAvatars": [],
        "applicationUserClaims": [
            {
                "id": 198952,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "IsAdmin"
            },
            {
                "id": 198953,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ViewReports"
            },
            {
                "id": 198954,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ViewBilling"
            },
            {
                "id": 198955,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageBilling"
            },
            {
                "id": 198956,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ViewUsers"
            },
            {
                "id": 198957,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageUsers"
            },
            {
                "id": 198958,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ViewTasks"
            },
            {
                "id": 198959,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ViewAdminOptions"
            },
            {
                "id": 198960,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ViewScheduling"
            },
            {
                "id": 198961,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "RemovePrivilege"
            },
            {
                "id": 198962,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageAgencies"
            },
            {
                "id": 198963,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageClients"
            },
            {
                "id": 198964,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageJobs"
            },
            {
                "id": 198965,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageScheduling"
            },
            {
                "id": 198966,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageLocumJobOrders"
            },
            {
                "id": 198967,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageCredentialingLocks"
            },
            {
                "id": 198968,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageAdminOptions"
            },
            {
                "id": 198969,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageSubmissions"
            },
            {
                "id": 198970,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManagePlacements"
            },
            {
                "id": 198971,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "CanSearchCandidates"
            },
            {
                "id": 198972,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ImportData"
            },
            {
                "id": 198973,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "CanImpersonate"
            },
            {
                "id": 198974,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageInternalCandidates"
            },
            {
                "id": 198975,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageJobPostingRequirements"
            },
            {
                "id": 198976,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageJobOrderRequirements"
            },
            {
                "id": 198977,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManageProviderRequirements"
            },
            {
                "id": 198978,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "ManagePlacementRequirements"
            },
            {
                "id": 198979,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/staff",
                "claimValue": "IsSuperAdmin"
            },
            {
                "id": 198980,
                "userId": "312e59f6-58eb-4f71-8088-dc8ccd6ff6fa",
                "claimType": "http://rbac.com/ws/identity/claims/agency",
                "claimValue": "CanViewAPI"
            }
        ],
        "applicationUserClients": [],
        "applicationUserLogins": [],
        "assignmentConfirmationLocumVersions": [],
        "assignmentConfirmationVersions": [],
        "attachments": [],
        "clientRepresentatives": [],
        "clientSegments": [],
        "interactionCloseoutUsers": [],
        "interactionUsers": [],
        "inverseAssistant": [],
        "inverseManager": [],
        "invoicePlacementCoordinatorUsers": [],
        "invoiceRegionalDirectorUsers": [],
        "invoiceRelationshipManagerUsers": [],
        "invoiceStatusHistories": [],
        "jobCandidateNotifications": [],
        "jobPlacementCoordinatorUsers": [],
        "jobRelationshipManagerUsers": [],
        "jobStatusHistories": [],
        "jobUsers": [],
        "jobViews": [],
        "messageSenders": [],
        "messageTargets": [],
        "notes": [],
        "passwordHistories": [],
        "positionStatusHistories": [],
        "privilegeComplianceApprovalHistories": [],
        "privilegeStatusHistories": [],
        "privilegeSubmissionApprovals": [],
        "privilegeSubmissionStatusHistories": [],
        "privilegeSubmissions": [],
        "submissionComplianceApprovalHistories": [],
        "submissionComplianceUsers": [],
        "submissionPostedUsers": [],
        "submissionStatusHistories": [],
        "timeCardStatusHistories": [],
        "userPreferences": [],
        "userStatusHistoryPostedUsers": [],
        "userStatusHistoryUsers": [],
        "userSubscriptionFilters": [],
        "userSubscriptions": [],
        "roles": [
            {
                "id": "18e60757-a265-42e8-9711-9c62a9e1920c",
                "name": "Agency admin",
                "userType": 2,
                "claims": [],
                "users": []
            },
            {
                "id": "2CB23AEE-23A3-4A8D-B27B-0F4F4DB2DF2B",
                "name": "Account Manager",
                "userType": 2,
                "claims": [],
                "users": []
            },
            {
                "id": "33565694-8DE7-4EEB-BE07-195D32AC1A5F",
                "name": "Client Hiring Manager",
                "userType": 4,
                "claims": [],
                "users": []
            },
            {
                "id": "376A1B72-91ED-476F-AF12-CA3373F46D0C",
                "name": "Client",
                "userType": 4,
                "claims": [],
                "users": []
            },
            {
                "id": "39DBD939-DAF8-4C30-B1F3-F14800483874",
                "name": "Client Hiring Manager With Restrictions",
                "userType": 4,
                "claims": [],
                "users": []
            },
            {
                "id": "43BDED28-141A-402C-92D0-36EB818F2812",
                "name": "Agency",
                "userType": 2,
                "claims": [],
                "users": []
            },
            {
                "id": "493e08b1-8e37-4906-8195-2d76bc1ba9b1",
                "name": "Billing Approver",
                "userType": 4,
                "claims": [],
                "users": []
            },
            {
                "id": "519BB03D-DA55-45B1-91FE-1CDBA4A448EF",
                "name": "Billing Manager",
                "userType": 1,
                "claims": [],
                "users": []
            },
            {
                "id": "58E9CF60-5E12-4D64-B76D-86EF4FDAD179",
                "name": "Executive",
                "userType": 1,
                "claims": [],
                "users": []
            },
            {
                "id": "66021b96-b0a3-40a6-b92f-88b4856d80b0",
                "name": "Compliance Manager",
                "userType": 1,
                "claims": [],
                "users": []
            },
            {
                "id": "7D9F2267-9F7A-4BE4-BF52-AC6E361D8E78",
                "name": "Billing Coordinator",
                "userType": 1,
                "claims": [],
                "users": []
            },
            {
                "id": "7edf5e5d-f43c-4dd8-b47d-e416e438697b",
                "name": "Credentialing Manager",
                "userType": 1,
                "claims": [],
                "users": []
            },
            {
                "id": "87F88952-EE4C-4720-9B42-FE2CC69B68F5",
                "name": "Relationship Manager",
                "userType": 1,
                "claims": [],
                "users": []
            },
            {
                "id": "8d35d69f-1ba8-4aaf-8658-1f08b2256fc3",
                "name": "Guest",
                "userType": 1,
                "claims": [],
                "users": []
            },
            {
                "id": "9090F6B5-912A-4319-A54E-1B258A432A6E",
                "name": "Staff",
                "userType": 1,
                "claims": [],
                "users": []
            },
            {
                "id": "944D1180-B713-47DA-A9CA-FBD81127D6D3",
                "name": "Client Admin",
                "userType": 4,
                "claims": [],
                "users": []
            },
            {
                "id": "a079ae27-b5a8-4a2e-811b-078c836d144a",
                "name": "View Timecards",
                "userType": 4,
                "claims": [],
                "users": []
            },
            {
                "id": "A7499871-2003-44FB-86D7-2B9059AB7AB3",
                "name": "Administrator",
                "userType": 1,
                "claims": [],
                "users": []
            },
            {
                "id": "b0111e1c-19d8-4640-b381-316021228897",
                "name": "Import Data",
                "userType": 1,
                "claims": [],
                "users": []
            },
            {
                "id": "BF367C42-95E5-404F-9E56-2F4CE5FCFC37",
                "name": "Recruiter",
                "userType": 2,
                "claims": [],
                "users": []
            },
            {
                "id": "daf2cdae-61d2-4e08-9ec3-0f0f6e05769c",
                "name": "Billing",
                "userType": 2,
                "claims": [],
                "users": []
            },
            {
                "id": "E5C2CBCF-B784-4B31-89FE-098A892021AC",
                "name": "API User",
                "userType": 0,
                "claims": [],
                "users": []
            },
            {
                "id": "F4E1E081-5791-4676-87E0-960D6E0AA1F8",
                "name": "Placement Coordinator",
                "userType": 1,
                "claims": [],
                "users": []
            }
        ]
    }
  return NextResponse.json({
    claims
  });
};