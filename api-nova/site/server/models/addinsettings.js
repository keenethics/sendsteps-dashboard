/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addinsettings', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    websiteAddress: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    twitterAddress: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    buildDateRecommendedVersion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    buildDateRequiredVersion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    buildDateCurrentVersion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    exclusiveAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    userOpinionsContact: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dashboardUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    accountId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'accounts',
        key: 'id'
      }
    },
    ownerId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    baseColors: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    maxFreeAudienceSize: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '20'
    },
    useFileBasedBranding: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    cssUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    useLogoImageAsIs: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    logo2x: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    logoTop: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    logoTop2x: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    loginBackground: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    toggleLeftbar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    toggleLeftbar2x: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    manifestJson: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    androidChrome512: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    androidChrome192: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    androidChrome144: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    appleTouchIcon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    safariPinnedTabSvg: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    browserconfigXml: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mstile150: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    faviconIco: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    favicon16: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    favicon32: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    textColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    generalHeadingColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    pageHeadingHeadingColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    panelHeadingColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    defaultBtnBackgroundColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    primaryBtnBackgroundColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    inverseBtnBackgroundColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    altMidnightblueBtnBackgroundColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    topbarTextColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    topbarBackgroundColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    sidebarSectionTextColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    sidebarMenuActiveTextColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    sidebarMenuActiveBackgroundColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    additionalLess: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loginBackgroundBlendColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    loginBackgroundBlendType: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sidebarTextColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    sidebarBackgroundColor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    buildDateWebGraphsVersion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'addinsettings'
  });
};
