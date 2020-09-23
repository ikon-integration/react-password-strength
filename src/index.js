import './style.css';

import React, { Component } from 'react';
import zxcvbn from 'zxcvbn';
import PropTypes from 'prop-types';
//
const ShowIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDMyIDMyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4wLjMgKDc4OTEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPmljb24gMjIgZXllPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Imljb24tMjItZXllIiBza2V0Y2g6dHlwZT0iTVNBcnRib2FyZEdyb3VwIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE2LDkgQzcsOSAzLDE2IDMsMTYgQzMsMTYgNywyMy4wMDAwMDEgMTYsMjMgQzI1LDIyLjk5OTk5OSAyOSwxNiAyOSwxNiBDMjksMTYgMjUsOSAxNiw5IEwxNiw5IEwxNiw5IFogTTE2LDEwIEM4LDEwIDQuMTk5OTUxMTcsMTYgNC4xOTk5NTExNywxNiBDNC4xOTk5NTExNywxNiA4LDIyLjAwMDAwMDYgMTYsMjIgQzI0LDIxLjk5OTk5OSAyNy44MDAwNDg4LDE2IDI3LjgwMDA0ODgsMTYgQzI3LjgwMDA0ODgsMTYgMjQsMTAgMTYsMTAgTDE2LDEwIEwxNiwxMCBaIE0xNiwyMCBDMTguMjA5MTM5MSwyMCAyMCwxOC4yMDkxMzkxIDIwLDE2IEMyMCwxMy43OTA4NjA5IDE4LjIwOTEzOTEsMTIgMTYsMTIgQzEzLjc5MDg2MDksMTIgMTIsMTMuNzkwODYwOSAxMiwxNiBDMTIsMTguMjA5MTM5MSAxMy43OTA4NjA5LDIwIDE2LDIwIEwxNiwyMCBMMTYsMjAgWiBNMTYsMTkgQzE3LjY1Njg1NDMsMTkgMTksMTcuNjU2ODU0MyAxOSwxNiBDMTksMTQuMzQzMTQ1NyAxNy42NTY4NTQzLDEzIDE2LDEzIEMxNC4zNDMxNDU3LDEzIDEzLDE0LjM0MzE0NTcgMTMsMTYgQzEzLDE3LjY1Njg1NDMgMTQuMzQzMTQ1NywxOSAxNiwxOSBMMTYsMTkgTDE2LDE5IFogTTE2LDE3IEMxNi41NTIyODQ4LDE3IDE3LDE2LjU1MjI4NDggMTcsMTYgQzE3LDE1LjQ0NzcxNTIgMTYuNTUyMjg0OCwxNSAxNiwxNSBDMTUuNDQ3NzE1MiwxNSAxNSwxNS40NDc3MTUyIDE1LDE2IEMxNSwxNi41NTIyODQ4IDE1LjQ0NzcxNTIsMTcgMTYsMTcgTDE2LDE3IEwxNiwxNyBaIiBpZD0iZXllIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
const HideIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDMyIDMyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4wLjMgKDc4OTEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPmljb24gMjEgZXllIGhpZGRlbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPgogICAgICAgIDxnIGlkPSJpY29uLTIxLWV5ZS1oaWRkZW4iIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIGZpbGw9IiMwMDAwMDAiPgogICAgICAgICAgICA8cGF0aCBkPSJNOC4xMDg2OTg5MSwyMC44OTEzMDExIEM0LjYxNzIwODE2LDE4LjgzMDExNDcgMywxNiAzLDE2IEMzLDE2IDcsOSAxNiw5IEMxNy4zMDQ1MTA3LDkgMTguNTAzOTc1Miw5LjE0NzA2NDY2IDE5LjYwMTQzODgsOS4zOTg1NjEyMiBMMTguNzUxOTAxNywxMC4yNDgwOTgzIEMxNy44OTcxNDg0LDEwLjA5MDA1NDYgMTYuOTgwMDkyOSwxMCAxNiwxMCBDOCwxMCA0LjE5OTk1MTE3LDE2IDQuMTk5OTUxMTcsMTYgQzQuMTk5OTUxMTcsMTYgNS43MTQ3MjgwOCwxOC4zOTE3MjI1IDguODQ0OTI3MTMsMjAuMTU1MDcyOSBMOC4xMDg2OTg5MSwyMC44OTEzMDExIEw4LjEwODY5ODkxLDIwLjg5MTMwMTEgTDguMTA4Njk4OTEsMjAuODkxMzAxMSBaIE0xMi4zOTg1NjEsMjIuNjAxNDM5IEMxMy40OTYwMjQ2LDIyLjg1MjkzNTYgMTQuNjk1NDg5MiwyMy4wMDAwMDAxIDE2LDIzIEMyNSwyMi45OTk5OTkgMjksMTYgMjksMTYgQzI5LDE2IDI3LjM4Mjc5MTgsMTMuMTY5ODg1NiAyMy44OTEzMDA4LDExLjEwODY5OTIgTDIzLjE1NTA3MjcsMTEuODQ0OTI3MyBDMjYuMjg1MjcxOSwxMy42MDgyNzc2IDI3LjgwMDA0ODgsMTYgMjcuODAwMDQ4OCwxNiBDMjcuODAwMDQ4OCwxNiAyNCwyMS45OTk5OTkgMTYsMjIgQzE1LjAxOTkwNywyMi4wMDAwMDAxIDE0LjEwMjg1MTUsMjEuOTA5OTQ1NSAxMy4yNDgwOTgxLDIxLjc1MTkwMTkgTDEyLjM5ODU2MSwyMi42MDE0MzkgTDEyLjM5ODU2MSwyMi42MDE0MzkgTDEyLjM5ODU2MSwyMi42MDE0MzkgWiBNMTkuODk4NjUzMSwxNS4xMDEzNDY5IEMxOS45NjQ5NjU4LDE1LjM5MDIxMTUgMjAsMTUuNjkxMDE0NCAyMCwxNiBDMjAsMTguMjA5MTM5MSAxOC4yMDkxMzkxLDIwIDE2LDIwIEMxNS42OTEwMTQ0LDIwIDE1LjM5MDIxMTUsMTkuOTY0OTY1OCAxNS4xMDEzNDY5LDE5Ljg5ODY1MzEgTDE2LDE5IEMxNi43Njc3NjY5LDE5LjAwMDAwMDEgMTcuNTM1NTMzOSwxOC43MDcxMDY4IDE4LjEyMTMyMDMsMTguMTIxMzIwMyBDMTguNzA3MTA2OCwxNy41MzU1MzM5IDE5LjAwMDAwMDEsMTYuNzY3NzY2OSAxOSwxNiBMMTkuODk4NjUzMSwxNS4xMDEzNDY5IEwxOS44OTg2NTMxLDE1LjEwMTM0NjkgTDE5Ljg5ODY1MzEsMTUuMTAxMzQ2OSBaIE0xNi44OTg2NTMxLDEyLjEwMTM0NjkgQzE2LjYwOTc4ODUsMTIuMDM1MDM0MiAxNi4zMDg5ODU2LDEyIDE2LDEyIEMxMy43OTA4NjA5LDEyIDEyLDEzLjc5MDg2MDkgMTIsMTYgQzEyLDE2LjMwODk4NTYgMTIuMDM1MDM0MiwxNi42MDk3ODg1IDEyLjEwMTM0NjksMTYuODk4NjUzMSBMMTMsMTYgQzEyLjk5OTk5OTksMTUuMjMyMjMzMSAxMy4yOTI4OTMyLDE0LjQ2NDQ2NjEgMTMuODc4Njc5NywxMy44Nzg2Nzk3IEMxNC40NjQ0NjYxLDEzLjI5Mjg5MzIgMTUuMjMyMjMzMSwxMi45OTk5OTk5IDE2LDEzIEwxNi44OTg2NTMxLDEyLjEwMTM0NjkgTDE2Ljg5ODY1MzEsMTIuMTAxMzQ2OSBMMTYuODk4NjUzMSwxMi4xMDEzNDY5IFogTTI0LDcgTDcsMjQgTDgsMjUgTDI1LDggTDI0LDcgTDI0LDcgWiIgaWQ9ImV5ZS1oaWRkZW4iIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==";

const isTooShort = (password, minLength) => password.length < minLength;

export default class ReactPasswordStrength extends Component {
  static propTypes = {
    changeCallback: PropTypes.func,
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    inputProps: PropTypes.object,
    minLength: PropTypes.number,
    minScore: PropTypes.number,
    namespaceClassName: PropTypes.string,
    scoreWords: PropTypes.array,
    style: PropTypes.object,
    tooShortWord: PropTypes.string,
    userInputs: PropTypes.array,
    enabledVisibityToogle: PropTypes.bool,
  }

  static defaultProps = {
    changeCallback: null,
    className: '',
    defaultValue: '',
    minLength: 5,
    minScore: 2,
    namespaceClassName: 'ReactPasswordStrength',
    scoreWords: ['weak', 'weak', 'okay', 'good', 'strong'],
    tooShortWord: 'too short',
    userInputs: [],
    enabledVisibityToogle: false,
  }

  state = {
    score: 0,
    isValid: false,
    password: '',
    passwordVisible: false,
  }

  componentDidMount() {
    const { defaultValue } = this.props;

    if (defaultValue.length > 0) {
      this.setState({ password: defaultValue }, this.handleChange);
    }
  }

  clear = () => {
    const { changeCallback } = this.props;

    this.setState({
      score: 0,
      isValid: false,
      password: '',
    }, () => {
      this.reactPasswordStrengthInput.value = '';

      if (changeCallback !== null) {
        changeCallback(this.state);
      }
    });
  }

  handleChange = () => {
    const { changeCallback, minScore, userInputs, minLength } = this.props;
    const password = this.reactPasswordStrengthInput.value;

    let score = 0;
    let result = null;

    // always sets a zero score when min length requirement is not met
    // avoids unnecessary zxcvbn computations (CPU intensive)
    if (isTooShort(password, minLength) === false) {
      result = zxcvbn(password, userInputs);
      score = result.score;
    }

    this.setState({
      isValid: score >= minScore,
      password,
      score,
    }, () => {
      if (changeCallback !== null) {
        changeCallback(this.state, result);
      }
    });
  }
  handlePasswordVisibilityToogle(e) {
    e.preventDefault();
    this.setState({ passwordVisible: !this.state.passwordVisible });
  }

  render() {
    const { score, password, isValid, passwordVisible } = this.state;
    const {
      className,
      inputProps,
      minLength,
      namespaceClassName,
      scoreWords,
      style,
      tooShortWord,
    } = this.props;

    const inputClasses = [ `${namespaceClassName}-input` ];
    const wrapperClasses = [
      namespaceClassName,
      className ? className : '',
      password.length > 0 ? `is-strength-${score}` : '',
    ];
    const strengthDesc = (
      isTooShort(password, minLength)
      ? tooShortWord
      : scoreWords[score]
    );

    if (isValid === true) {
      inputClasses.push('is-password-valid');
    } else if (password.length > 0) {
      inputClasses.push('is-password-invalid');
    }

    if (inputProps && inputProps.className) {
      inputClasses.push(inputProps.className);
    }

    return (
      <div className={wrapperClasses.join(' ')} style={style}>
        <input
          type={passwordVisible ? "text" : "password"}
          {...inputProps}
          className={inputClasses.join(' ')}
          onChange={this.handleChange}
          ref={ref => this.reactPasswordStrengthInput = ref}
          value={password}
        />
        {this.props.enabledVisibityToogle &&
          <button className={`${namespaceClassName}-visibility-button`} onClick={this.handlePasswordVisibilityToogle.bind(this)} tabIndex="-1">
            <img src={(this.state.passwordVisible ? HideIcon : ShowIcon)} alt="tooggle visibility"/>
          </button>
        }
        <div className={`${namespaceClassName}-strength-bar`} />
        <span className={`${namespaceClassName}-strength-desc${(this.props.enabledVisibityToogle ? ' vbutton' : '')}`}>{strengthDesc}</span>
      </div>
    );
  }
}
