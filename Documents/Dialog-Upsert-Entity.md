# Dialog Upsert Entity

<!-- > 2019-08-13T17:17:26+0800 -->

Define a dialog to create/edit kinds of entities, containing an entity editor,

requiring:

- Dialog
	- Switch
	- Title
	- Full Screen
- Entity
	- Type Entity
	- Type Entity Patch
	- Fields Definitions
- Data Source
	- Base Entry for Creation
	- Target Entity and ID for Modification
	- Get Unified Entity
	- Is Resolved Entity Valid
- Actions
	- Optional Action to Create Entity
	- Optional Action to Update Entity
	- Optional Action to Delete Entity
	- Action to Dismiss Dialog

which are Resolved as:

- Unified Entity / Real Base Entity
	- A mirror of the target tag filled with default values.
	- Served as template to compare field by field to keep the patch tiny and meaningful.
	- Avoid the patch being filled with default values, confusing the patch construction.
- Initial Entity Patch
	- Basically nothing( to update by default) for modification.
	- The base entity given(, the default to create,) is used as patch for creation.

holding the State of the Entity Patch:

- Entity Patch

with Immediately Calculated Values:

- Is Patch Ready
	- Is the current patch ready to commit(create/update)?
	- If so, the current patch is not ready to delete.

---

# Back-end API Design

<!-- > 2019-08-14T07:50:19+0800 -->

An *entity editor*
cares the back-end API designs
to prepare any patches expected
especially when it comes with the complex fields,
like objects array, fields with default values, and so on.

## Update the Value of Array Field

<!-- > 2019-07-27T09:32:58+0800 -->

- Create
	- undefined/null/[] -> [] / nil
	- [values] -> [values]
- Update
	- undefined/null -> ignore
	- [] -> reset the value -> [] / nil
	- [values] -> set to the new value -> [values]
