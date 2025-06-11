import { html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { define, Form, View, History } from "@calpoly/mustang";
import { Activity } from "server/models";
import { Msg } from "../messages.ts";
import { reset } from "../styles/reset.css.ts";

export class ActivityEditElement extends View<{}, Msg> {
  static uses = define({
    "mu-form": Form.Element,
  });

  @property({ attribute: "activity-id" }) activityId = "";

  @state() activity: Activity = {
    activityName: "",
    location: "",
    notes: "",
  };

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === "activity-id" && newVal && oldVal !== newVal) {
      this.dispatchMessage(["activity/select", { activityId: newVal }]);
    }
  }

  render() {
    return html`
      <mu-form .init=${this.activity} @mu-form:submit=${this.handleSubmit}>
        <div class="card-container">
          <label class="activity-text">
            Activity
            <input
              name="activityName"
              value=${this.activity.activityName}
              required
            />
          </label>

          <label class="activity-text">
            Location
            <input name="location" value=${this.activity.location} required />
          </label>

          <label class="notes">
            Notes
            <textarea name="notes">${this.activity.notes}</textarea>
          </label>

          <button type="submit">Save</button>
        </div>
      </mu-form>
    `;
  }

  handleSubmit(event: Form.SubmitEvent<Activity>) {
    const updated = event.detail;

    this.dispatchMessage([
      "activity/save",
      {
        activityId: this.activityId,
        activity: updated,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: "/app",
          }),
        onFailure: (err) => console.error("Save failed:", err),
      },
    ]);
  }

  static styles = [
    reset,
    css`
      mu-form {
        display: flex;
        width: 100%;
      }
      .card-container {
        display: flex;
        flex-direction: column;
        padding: 16px;
        gap: 18px;
        align-self: stretch;
        border-radius: 16px;
        background-color: var(--color-bg-nav);
        width: 500px;
      }

      .activity-text,
      .notes {
        font-family: var(--font-body);
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: white;
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
      }

      input,
      textarea {
        width: 100%;
        padding: 8px;
        font-size: 16px;
        border-radius: 8px;
        border: none;
        box-sizing: border-box;
      }

      button {
        width: 100%;
        margin-top: 12px;
        padding: 12px;
        font-size: 16px;
        border-radius: 8px;
        border: none;
        background-color: white;
        color: black;
        cursor: pointer;
      }
    `,
  ];
}
