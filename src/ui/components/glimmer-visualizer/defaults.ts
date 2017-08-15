export const DEFAULT_DATA = `
{
  "contacts": [
    {
      "id": 1,
      "name": {
        "first": "John",
        "last": "Appleseed"
      },
      "org": "Apple Inc.",
      "email": "appleseed@apple.com",
      "address": {
        "street": "1 Infinite Loop",
        "city": "Cupertino",
        "state": "CA",
        "zip": 95014,
        "country": "USA"
      },
      "phones": [
        {
          "type": "Office",
          "number": "1 (800) MYAPPLE"
        },
        {
          "type": "Home",
          "number": "(555) 123 4567"
        },
        {
          "type": "Mobile",
          "number": "(555) 555 5555"
        }
      ]
    }
  ]
}`;

export const DEFAULT_TEMPLATE = `
<div class="contacts">
  {{#each contacts key="id" as |contact|}}
    <h-card @person={{contact}} />
    <hr />
  {{/each}}
</div>`;

export const DEFAULT_LAYOUT = `
<div class="vcard">
  {{#if @person.url}}
    <div>
      <a class="url fn n" href="{{@person.url}}">
      {{#with @person.name as |name|}}
        <span class="given-name">{{name.first}}</span>
        {{#if name.middle}}
        <span class="additional-name">{{name.middle}}</span>
        {{/if}}
        <span class="family-name">{{name.last}}</span>
      {{/with}}
      </a>
    </div>
  {{else}}
    <div>
      {{#with @person.name as |name|}}
        <span class="given-name">{{name.first}}</span>
        {{#if name.additional}}
        <span class="additional-name">{{name.middle}}</span>
        {{/if}}
        <span class="family-name">{{name.last}}</span>
      {{/with}}
    </div>
  {{/if}}
  {{#if @person.org}}
    <div class="org">{{@person.org}}</div>
  {{/if}}
  {{#if @person.email}}
    <div>
      <a class="email" href="mailto:{{@person.email}}">
        {{@person.email}}
      </a>
    </div>
  {{/if}}
  {{#with @person.address as |address|}}
    <div class="adr">
      <span class="street-address">{{address.street}}</span>
      <br>
      <span class="locality">{{address.city}}</span>,
      <span class="region">{{address.state}}</span>
      <span class="postal-code">{{address.zip}}</span>
      <br>
      <span class="country-name">{{address.country}}</span>
    </div>
  {{/with}}
  {{#each @person.phones key="type" as |phone|}}
    <div class="tel">
      <span class="type">{{phone.type}}</span>:
      <span class="value">{{phone.number}}</span>
    </div>
  {{/each}}
</div>`;

export default {
  data: DEFAULT_DATA,
  template: DEFAULT_TEMPLATE,
  layout: DEFAULT_LAYOUT,
};
