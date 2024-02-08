module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
  rules: {
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
    "jsx-a11y/label-has-associated-control": "off",
    "media-feature-range-notation": "off",
    "import-notation": "off",
    "keyframe-selector-notation": "off",
    "selector-not-notation": "off",
    "annotation-no-unknown": "off",
    "custom-property-no-missing-var-function": "off",
    "function-no-unknown": "off",
    "keyframe-block-no-duplicate-selectors": "off",
    "media-query-no-invalid": "off",
    "selector-anb-no-unmatchable": "off"
  },

};
