const setupBuilder = (() => {
  const buildFilterOperators = type => {
    if (!["date", "daterange"].includes(type)) return undefined;
    const operators = [
      "equal",
      "not_equal",
      "less",
      "less_or_equal",
      "greater",
      "greater_or_equal",
      "is_empty",
      "is_not_empty"
    ];
    type === "daterange" && operators.push("contain");
    return operators;
  };

  const typeaheadProperties = (urlSuffix, layoutId, instanceId) => ({
    input: (container, rule, input_name) =>
      `<input class="typeahead_text" type="text" name="${input_name}_text">
      <input class="typeahead_hidden" type="hidden" name="${input_name}"></input>`,
    valueSetter: ($rule, value, filter, operator, data) => {
      $rule.find(".typeahead_text").val(data.text);
      $rule.find(".typeahead_hidden").val(value);
    },
    onAfterCreateRuleInput: $rule => {
      var $ruleInputText = $(
        `#${$rule.attr("id")} .rule-value-container input[type="text"]`
      );
      var $ruleInputHidden = $(
        `#${$rule.attr("id")} .rule-value-container input[type="hidden"]`
      );
      $ruleInputText.attr("autocomplete", "off");
      $ruleInputText.typeahead({
        delay: 100,
        matcher: function() {
          return true;
        },
        sorter: function(items) {
          return items;
        },
            displayText: function(item){
              return item.label;
            },
        afterSelect: function(selected) {
          if (typeof selected === "object") {
            $ruleInputHidden.val(selected.id);
          } else {
            $ruleInputHidden.val(selected);
          }
        },
        source: function(query, process) {
          return $.ajax({
            type: "GET",
            url: `/${layoutId}/match/layout/${urlSuffix}`,
            data: { q: query, oi: instanceId },
            success: function(result) {
              process(result.records);
            },
            dataType: "json"
          });
        }
      });
    }
  });

  const ragProperties = {
    input: "select",
    values: {
      b_red: "Red",
      c_amber: "Amber",
      c_yellow: "Yellow",
      d_green: "Green",
      a_grey: "Grey",
      e_purple: "Purple"
    }
  };

  const buildFilter = (builderConfig, col) => ({
    id: col.filterId,
    label: col.label,
    type: "string",
    operators: buildFilterOperators(col.type),
    ...(col.type === "rag"
      ? ragProperties
      : col.hasFilterTypeahead
      ? typeaheadProperties(
          col.urlSuffix,
          builderConfig.layoutId,
          col.instanceId
        )
      : {})
  });

  const makeUpdateFilter = () => {
    window.UpdateFilter = builder => {
      var res = builder.queryBuilder("getRules");
      $("#filter").val(JSON.stringify(res, null, 2));
    };
  };

  const operators = [
    {
      type: "equal",
      accept_values: true,
      apply_to: ["string", "number", "datetime"]
    },
    {
      type: "not_equal",
      accept_values: true,
      apply_to: ["string", "number", "datetime"]
    },
    {
      type: "less",
      accept_values: true,
      apply_to: ["string", "number", "datetime"]
    },
    {
      type: "less_or_equal",
      accept_values: true,
      apply_to: ["string", "number", "datetime"]
    },
    {
      type: "greater",
      accept_values: true,
      apply_to: ["string", "number", "datetime"]
    },
    {
      type: "greater_or_equal",
      accept_values: true,
      apply_to: ["string", "number", "datetime"]
    },
    {
      type: "contains",
      accept_values: true,
      apply_to: ["datetime", "string"]
    },
    {
      type: "not_contains",
      accept_values: true,
      apply_to: ["datetime", "string"]
    },
    { type: "begins_with", accept_values: true, apply_to: ["string"] },
    { type: "not_begins_with", accept_values: true, apply_to: ["string"] },
    {
      type: "is_empty",
      accept_values: false,
      apply_to: ["string", "number", "datetime"]
    },
    {
      type: "is_not_empty",
      accept_values: false,
      apply_to: ["string", "number", "datetime"]
    },
    {
      type: "changed_after",
      nb_inputs: 1,
      accept_values: true,
      multiple: false,
      apply_to: ["string", "number", "datetime"]
    }
  ];

  const setupBuilder = builderEl => {
    const builderConfig = JSON.parse($(builderEl).html());
    if (builderConfig.filterNotDone) makeUpdateFilter();

    $(`#builder${builderConfig.builderId}`).queryBuilder({
      showPreviousValues: builderConfig.showPreviousValues,
      filters: builderConfig.filters.map(col =>
        buildFilter(builderConfig, col)
      ),
      operators,
      lang: {
        operators: {
          changed_after: "changed on or after"
        }
      }
    });
  };

  const setupAllBuilders = context => {
    $('script[id^="builder_json_"]', context).each((i, builderEl) => {
      setupBuilder(builderEl);
    });
  };

  const setupTypeahead = context => {
    $(document, context).on("input", ".typeahead_text", function() {
      var value = $(this).val();
      $(this)
        .next(".typeahead_hidden")
        .val(value);
    });
  };

  return context => {
    setupAllBuilders(context);
    setupTypeahead(context);
  };
})();

export { setupBuilder };
