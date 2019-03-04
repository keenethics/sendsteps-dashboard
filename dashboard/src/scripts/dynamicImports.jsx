"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserOverview = exports.SessionDetails = exports.SessionOverview = exports.DeleteUsersOverview = exports.PhonenumberDetails = exports.PhonenumbersOverview = exports.EditDashboardDetails = exports.EditDashboardOverview = exports.TranslationsDetails = exports.TranslationsOverview = exports.SurveyResultsOverview = exports.PresentationsDetails = exports.PresentationsOverview = exports.MessageFilterLayout = exports.ResponsesiteDetails = exports.SurveyDetails = exports.SurveyOverview = exports.AudienceDetails = exports.ResponsesiteSettings = exports.ResponsesiteLayout = exports.AboutSendsteps = exports.AboutHowItWorks = exports.AboutDashboard = exports.PageNotFound = exports.Home = void 0;

var _react = _interopRequireDefault(require("react"));

var _DynamicImport = _interopRequireDefault(require("../pages/base/DynamicImport"));

var _LoadingView = _interopRequireDefault(require("../pages/base/LoadingView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import('../pages/home/Home');
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.Home = Home;

var PageNotFound = function PageNotFound(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/base/PageNotFound");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.PageNotFound = PageNotFound;

var AboutDashboard = function AboutDashboard(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/about/dashboard");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.AboutDashboard = AboutDashboard;

var AboutHowItWorks = function AboutHowItWorks(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/about/howitworks");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.AboutHowItWorks = AboutHowItWorks;

var AboutSendsteps = function AboutSendsteps(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/about/sendsteps");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.AboutSendsteps = AboutSendsteps;

var ResponsesiteLayout = function ResponsesiteLayout(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/session-before/responsesite-layout/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.ResponsesiteLayout = ResponsesiteLayout;

var ResponsesiteSettings = function ResponsesiteSettings(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/session-before/responsesite-settings/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.ResponsesiteSettings = ResponsesiteSettings;

var AudienceDetails = function AudienceDetails(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/session-before/audience-identification/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.AudienceDetails = AudienceDetails;

var SurveyOverview = function SurveyOverview(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/session-before/surveys/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.SurveyOverview = SurveyOverview;

var SurveyDetails = function SurveyDetails(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/session-before/surveys/Details");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.SurveyDetails = SurveyDetails;

var ResponsesiteDetails = function ResponsesiteDetails(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/session-before/response-website/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.ResponsesiteDetails = ResponsesiteDetails;

var MessageFilterLayout = function MessageFilterLayout(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/session-during/message-filter/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.MessageFilterLayout = MessageFilterLayout;

var PresentationsOverview = function PresentationsOverview(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/session-results/presentations/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.PresentationsOverview = PresentationsOverview;

var PresentationsDetails = function PresentationsDetails(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/session-results/presentations/Details");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.PresentationsDetails = PresentationsDetails;

var SurveyResultsOverview = function SurveyResultsOverview(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/session-results/surveys/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
}; // Superadmin


exports.SurveyResultsOverview = SurveyResultsOverview;

var TranslationsOverview = function TranslationsOverview(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/superadmin/translations/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.TranslationsOverview = TranslationsOverview;

var TranslationsDetails = function TranslationsDetails(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/superadmin/translations/Details");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.TranslationsDetails = TranslationsDetails;

var EditDashboardOverview = function EditDashboardOverview(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/superadmin/edit-dashboard/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.EditDashboardOverview = EditDashboardOverview;

var EditDashboardDetails = function EditDashboardDetails(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/superadmin/edit-dashboard/Details");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.EditDashboardDetails = EditDashboardDetails;

var PhonenumbersOverview = function PhonenumbersOverview(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/superadmin/phonenumbers/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.PhonenumbersOverview = PhonenumbersOverview;

var PhonenumberDetails = function PhonenumberDetails(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/superadmin/phonenumbers/Details");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.PhonenumberDetails = PhonenumberDetails;

var DeleteUsersOverview = function DeleteUsersOverview(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/superadmin/delete-users/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.DeleteUsersOverview = DeleteUsersOverview;

var SessionOverview = function SessionOverview(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/superadmin/sessions/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.SessionOverview = SessionOverview;

var SessionDetails = function SessionDetails(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/superadmin/sessions/Details");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.SessionDetails = SessionDetails;

var UserOverview = function UserOverview(props) {
  return _react.default.createElement(_DynamicImport.default, {
    load: function load() {
      return import("../pages/user/Overview");
    }
  }, function (Component) {
    return Component === null ? _react.default.createElement(_LoadingView.default, null) : _react.default.createElement(Component, props);
  });
};

exports.UserOverview = UserOverview;