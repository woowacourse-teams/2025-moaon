import { lazy } from "react";

export const ArticlePage = lazy(
  () => import(/* webpackChunkName: "article-page" */ "./article/ArticlePage")
);

export const EventLandingPage = lazy(
  () =>
    import(
      /* webpackChunkName: "event-landing-page" */ "./eventLanding/EventLandingPage"
    )
);

export const OAuthCallback = lazy(
  () => import(/* webpackChunkName: "oauth-callback" */ "./oauth/OAuthCallback")
);

export const ProjectDetailPage = lazy(
  () =>
    import(
      /* webpackChunkName: "project-detail-page" */ "./project-detail/ProjectDetailPage"
    )
);

export const ProjectListPage = lazy(
  () =>
    import(
      /* webpackChunkName: "project-list-page" */ "./project-list/ProjectListPage"
    )
);
export const RegisterPage = lazy(
  () =>
    import(/* webpackChunkName: "register-page" */ "./register/RegisterPage")
);

export const CompanyEventPage = lazy(
  () =>
    import(
      /* webpackChunkName: "company-event-page" */ "./wooteco/company/CompanyEventPage"
    )
);

export const WootecoEventPage = lazy(
  () =>
    import(
      /* webpackChunkName: "wooteco-event-page" */ "./wooteco/WootecoEventPage"
    )
);

export const NotFoundPage = lazy(
  () =>
    import(/* webpackChunkName: "not-found-page" */ "./notFound/NotFoundPage")
);
