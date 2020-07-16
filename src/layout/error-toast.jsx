const React = require('react')

function ErrorToast() {
  return (
    <React.Fragment>
      <input className="error-control" name="attr_show_error" type="checkbox" />
      <div className="error-toast">
        <div className="error-toast__icon">×</div>
        <div className="error-toast__message">
          <h2>Error</h2>
          <span name="attr_error_message" />
        </div>
        <button
          className="error-toast__close"
          name="act_close_error"
          type="action"
        >
          ×
        </button>
      </div>
    </React.Fragment>
  )
}

module.exports = ErrorToast
