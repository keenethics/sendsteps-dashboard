const Joi = require('@hapi/joi');
const models = require('../models');

const { response_websites: ResponseWebsite } = models;

function validateResponseSettings(settings) {
  const domainPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,\s<>\/?]/;
  const specialCharactersPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const colorPattern = /^(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))$/;
  const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

  const schema = Joi.object().keys({
    id: Joi.number().required(),
    domain: Joi.string()
      .regex(domainPattern, { invert: true })
      .required(),
    userId: Joi.string()
      .regex(specialCharactersPattern, { invert: true })
      .required(),
    title: Joi.string()
      .regex(specialCharactersPattern, { invert: true })
      .required(),
    default_language: Joi.string()
      .regex(specialCharactersPattern, { invert: true })
      .required(),
    loader_color: Joi.string()
      .regex(colorPattern)
      .required(),
    chart_results_color: Joi.string()
      .regex(colorPattern)
      .required(),
    popup_background_color: Joi.string()
      .regex(colorPattern)
      .required(),
    body_background_color: Joi.string()
      .regex(colorPattern)
      .required(),
    tab_active_color: Joi.string()
      .regex(colorPattern)
      .required(),
    tab_inactive_color: Joi.string()
      .regex(colorPattern)
      .required(),
    button_back_background_color: Joi.string()
      .regex(colorPattern)
      .required(),
    button_background_color: Joi.string()
      .regex(colorPattern)
      .required(),
    connect_button_color: Joi.string()
      .regex(colorPattern)
      .required(),
    menu_icon_color: Joi.string()
      .regex(colorPattern)
      .required(),
    menu_background_color: Joi.string()
      .regex(colorPattern)
      .required(),
    body_color: Joi.string()
      .regex(colorPattern)
      .required(),
    option_background_color: Joi.string()
      .regex(colorPattern)
      .required(),
    option_color: Joi.string()
      .regex(colorPattern)
      .required(),
    login_code_background_color: Joi.string()
      .regex(colorPattern)
      .required(),
    login_code_color: Joi.string()
      .regex(colorPattern)
      .required(),
    favicon_type: Joi.string()
      .valid(['image', 'url'])
      .required(),
    logo_align: Joi.string()
      .valid(['left', 'center', 'right'])
      .required(),
    logo_padding_top: Joi.number()
      .integer()
      .required(),
    logo_url: Joi.string()
      .regex(urlPattern)
      .required(),
    logo_url_new_tab: Joi.boolean().required(),
    main_background_type: Joi.string()
      .valid(['color', 'image'])
      .required(),
    background_position: Joi.string()
      .valid(['left', 'center', 'right'])
      .required(),
    main_color: Joi.string()
      .regex(colorPattern)
      .required(),
    logo_image: Joi.string()
      .regex(urlPattern)
      .required(),
    enable_overlay: Joi.boolean().required(),
    switch_off_new_relic: Joi.boolean().required(),
    switch_off_analytics: Joi.boolean().required(),
    switch_off_contact: Joi.boolean().required(),
    unique_response_codes_only: Joi.boolean().required(),
    dark_sst_logo: Joi.boolean().required(),
    cdn_url_overwrite: Joi.string()
      .regex(urlPattern)
      .required(),
    header_height: Joi.number()
      .integer()
      .required()
  });

  const result = Joi.validate(settings, schema);

  return result.error;
}

async function getSites(req, res) {
  const websites = await ResponseWebsite.findAll({
    attributes: ['id', 'domain'],
    where: {
      isDeleted: 0
    },
    order: [['domain']]
  });

  res.json({ content: websites });
}

async function getSiteById(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'id is required' });
  }

  const website = await ResponseWebsite.findOne({
    where: {
      isDeleted: 0,
      id
    }
  });

  res.json({ content: website });
}

async function editSite(req, res) {
  const settings = req.body;
  const {
    id,
    domain,
    userId,
    title,
    default_language,
    loader_color,
    chart_results_color,
    popup_background_color,
    body_background_color,
    tab_active_color,
    tab_inactive_color,
    button_back_background_color,
    button_background_color,
    connect_button_color,
    menu_icon_color,
    menu_background_color,
    body_color,
    option_background_color,
    option_color,
    login_code_background_color,
    login_code_color,
    favicon_type,
    logo_align,
    logo_padding_top,
    logo_url,
    logo_url_new_tab,
    main_background_type,
    main_color,
    background_position,
    logo_image,
    enable_overlay,
    switch_off_new_relic,
    switch_off_analytics,
    switch_off_contact,
    unique_response_codes_only,
    dark_sst_logo,
    cdn_url_overwrite,
    header_height
  } = settings;

  const errors = validateResponseSettings(settings);
  if (errors) {
    return res.status(400).json({ message: `${errors.details[0].path} parameter is invalid` });
  }

  try {
    await ResponseWebsite.update(
      {
        domain,
        userId,
        title,
        default_language,
        loader_color,
        chart_results_color,
        popup_background_color,
        body_background_color,
        tab_active_color,
        tab_inactive_color,
        button_back_background_color,
        button_background_color,
        connect_button_color,
        menu_icon_color,
        menu_background_color,
        body_color,
        option_background_color,
        option_color,
        login_code_background_color,
        login_code_color,
        favicon_type,
        logo_align,
        logo_padding_top,
        logo_url,
        logo_url_new_tab,
        main_background_type,
        main_color,
        background_position,
        logo_image,
        enable_overlay,
        switch_off_new_relic,
        switch_off_analytics,
        switch_off_contact,
        unique_response_codes_only,
        dark_sst_logo,
        cdn_url_overwrite,
        header_height
      },
      { where: { id } }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }

  res.json({ message: 'Response Website was updated' });
}

module.exports = { getSites, getSiteById, editSite };
