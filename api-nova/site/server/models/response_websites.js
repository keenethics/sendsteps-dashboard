/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('response_websites', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    account_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'accounts',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    domain: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    default_language: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: 'en'
    },
    logo_align: {
      type: DataTypes.ENUM('left','center'),
      allowNull: false,
      defaultValue: 'left'
    },
    logo_image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    logo_image_url2x: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    logo_image_x: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    logo_image_y: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    logo_padding_top: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    header_height: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    logo_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    favicon_image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    favicon_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    css_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    login_code_background_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    tab_active_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    tab_inactive_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    main_background_type: {
      type: DataTypes.ENUM('color','image'),
      allowNull: false,
      defaultValue: 'color'
    },
    main_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    main_image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    body_background_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    body_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    button_background_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    button_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    button_back_background_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    button_back_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    footer_background_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    option_background_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    option_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    option_chosen_background_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    option_chosen_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    text_background_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    text_placeholder_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    text_color: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    white_label: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    favicon_type: {
      type: DataTypes.ENUM('url','image'),
      allowNull: false,
      defaultValue: 'url'
    },
    switch_off_new_relic: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    switch_off_analytics: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    cdn_url_overwrite: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    unique_response_codes_only: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    dark_sst_logo: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    switch_off_contact: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    overlay_image: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    loader_color: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    enable_overlay: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    menu_icon_color: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    menu_background_color: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    background_position: {
      type: DataTypes.ENUM('left','center','right'),
      allowNull: false,
      defaultValue: 'left'
    },
    chart_results_color: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    connect_button_color: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    login_code_color: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    popup_background_color: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    logo_url_new_tab: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    upv_section_background: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    upv_circle_fill: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    upv_heart_fill: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    upv_badge_text: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    upv_badge_background: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    tableName: 'response_websites'
  });
};
