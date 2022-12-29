import { Component } from 'component'
import { logging } from 'logging'
import { MoreInfoButton } from './more-info-button'
import { validateRequiredFields } from 'validation'

class ButtonComponent extends Component {
  constructor(element)  {
    super(element)
    this.el = $(this.element)
    this.requiredHiddenRecordDependentFieldsCleared = false
    this.canSubmitRecordForm = false
    this.initButton()
  }

  initButton() {
    switch (true) {
      case this.el.hasClass('btn-js-more-info'):
        const moreInfoButton = new MoreInfoButton(this.el)
        break
      case this.el.hasClass('btn-js-delete'):
        this.initDelete()
        break
      case this.el.hasClass('btn-js-submit-field'):
        this.initSubmitField()
        break
      case this.el.hasClass('btn-js-submit-record'):
        this.initSubmitRecord()
        break
      case this.el.hasClass('btn-js-save-view'):
        this.initSaveView()
        break
      case this.el.hasClass('btn-js-show-blank'):
        this.initShowBlank()
        break
      case this.el.hasClass('btn-js-curval-remove'):
        this.initRemoveCurval()
        break
    }

    if (this.el.hasClass('btn-js-remove-unload')) {
      this.initRemoveUnload()
    }

    if (this.el.hasClass('btn-js-calculator')) {
      this.initCalculator()
    }
  }

  initRemoveCurval() {
    this.el.on('click', (ev) => {
      const $btn = $(ev.target)

      if ($btn.closest('.table-curval-group').length) {
        if (confirm("Are you sure want to permanently remove this item?")) {
          $btn.closest(".table-curval-item").remove()
        } else {
          e.preventDefault()
        }
      } else if ($btn.closest('.select-widget').length) {
        const fieldId = $btn.closest(".answer").find("input").prop("id")
        const $current = $btn.closest(".select-widget").find(".current")

        $current.find(`li[data-list-item=${fieldId}]`).remove()
        $btn.closest(".answer").remove()
        
        const $visible = $current.children("[data-list-item]:not([hidden])")
        $current.toggleClass("empty", $visible.length === 0)
      }
    })
  }

  initShowBlank() {
    this.el.on('click', (ev) => {
      const $button = $(ev.target).closest('.btn-js-show-blank')
      const $buttonTitle = $button.find('.btn__title')[0]
      const showBlankFields = $buttonTitle.innerHTML === "Show blank values"

      $(".list__item--blank").toggle(showBlankFields)

      $buttonTitle.innerHTML = showBlankFields
        ? "Hide blank values"
        : "Show blank values"
    })
  }

  initSubmitField() {
    this.el.on('click', (ev) => { this.submitField(ev) }) 
  }

  initSubmitRecord() {
    this.el.on('click', (ev) => { this.submitRecord(ev) })
  }

  initSaveView() {
    this.el.on('click', (ev) => { this.saveView(ev) }) 
  }

  initRemoveUnload() {
    this.el.on('click', (ev) => { 
      $(window).off('beforeunload') 
    }) 
  }

  initDelete() {
    this.el.on('click', (ev) => { this.dataToModal(ev) }) 
  }

  submitField(ev) {
    const $jstreeContainer = $('#field_type_tree')
    const $jstreeEl = $('#tree-config .tree-widget-container')

    const $displayConditionsBuilderEl = $('#displayConditionsBuilder')
    const res = $displayConditionsBuilderEl.length && $displayConditionsBuilderEl.queryBuilder('getRules')
    const $displayConditionsField = $('#displayConditions')

    const $instanceIDField = $('#refers_to_instance_id')
    const $filterEl = $instanceIDField.length && $(`[data-builder-id='${$instanceIDField.val()}']`)

    let bUpdateTree = false
    let bUpdateFilter = false
    let bUpdateDisplayConditions = false

    if (($jstreeContainer.length && $jstreeContainer.is(':visible') && $jstreeEl.length) || (!$jstreeContainer.length && $jstreeEl.length)) {
      bUpdateTree = true
    }

    if ($instanceIDField.length && !$instanceIDField.prop('disabled') && $filterEl.length) {
      bUpdateFilter = true
    }

    if (res && $displayConditionsField.length) {
      bUpdateDisplayConditions = true
    }

    if (bUpdateTree) {
      const v = $jstreeEl.jstree(true).get_json('#', { flat: false })
      const mytext = JSON.stringify(v)
      const data = $jstreeEl.data()

      $.ajax({
        async: false,
        type: 'POST',
        url: this.getURL(data),
        data: { data: mytext, csrf_token: data.csrfToken }
      }).done(() => {
        // eslint-disable-next-line no-alert
        alert('Tree has been updated')
      })
    } 
    
    if (bUpdateFilter) {
      window.UpdateFilter($filterEl)
    }

    if (bUpdateDisplayConditions) {
      $displayConditionsField.val(JSON.stringify(res, null, 2))
    }
  }

  submitRecord(ev) {
    const $button = $(ev.target).closest('button')
    const $form = $button.closest("form")
    const $requiredHiddenRecordDependentFields = $form.find(".form-group[data-has-dependency='1'][style*='display: none'] input[aria-required]")

    if (!this.requiredHiddenRecordDependentFieldsCleared) {
      ev.preventDefault()
      
      // Remove the required attribute from hidden required dependent fields
      $requiredHiddenRecordDependentFields.removeAttr('required')
      this.requiredHiddenRecordDependentFieldsCleared = true      
    }

    if (!this.canSubmitRecordForm) {
      ev.preventDefault()

      const isValid = validateRequiredFields($form)

      if (isValid) {
        this.canSubmitRecordForm = true
        $button.trigger('click')
      } else {
        // Re-add the required attribute to required dependent fields
        $requiredHiddenRecordDependentFields.attr('required', '')
        this.requiredHiddenRecordDependentFieldsCleared = false
      }
    }
  }

  saveView(ev){
    $(".filter").each((i, el) => {
      const res = $(el).queryBuilder('getRules')
      $(el).next('#filter').val(JSON.stringify(res, null, 2))
    })
  }

  getURL(data) {
    const devEndpoint = window.siteConfig && window.siteConfig.urls.treeApi

    if (devEndpoint) {
      return devEndpoint
    } else {
      return `/${data.layoutIdentifier}/tree/${data.columnId}`
    }
  }

  dataToModal(ev) {
    const $button = $(ev.target).closest('button')
    const title = $button.attr('data-title')
    const id = $button.attr('data-id')
    const target = $button.attr('data-target')
    const toggle = $button.attr('data-toggle')
    const modalTitle = title ? `Delete - ${title}` : 'Delete'
    const $deleteModal = $(document).find(`.modal--delete${target}`)

    try {
      if (!id || !target || !toggle) {
        throw 'Delete button should have data attributes id, toggle and target!'
      } else if ($deleteModal.length === 0) {
        throw `There is no modal with id: ${target}`
      }
    } catch (e) {
      logging.error(e)
      this.el.on('click', function(e) {
        e.stopPropagation()
      });
    }

    $deleteModal.find('.modal-title').text(modalTitle)
    $deleteModal.find('button[type=submit]').val(id)
  }
}

export default ButtonComponent
